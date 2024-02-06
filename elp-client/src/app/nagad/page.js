"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { usePayForExamMutation } from "@/redux/api/examsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  useSubscribeToCourseBundleMutation,
  useSubscribeToCourseMutation,
} from "@/redux/api/courseApi";
import { useUpdateShippingAddressMutation } from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import { useAddOrderMutation } from "@/redux/api/ordersApi";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Swal from "sweetalert2";
import successImg from "@/assets/images/success.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";

function Success() {
  const user_id = getUserInfo()?.userId;
  const searchParams = useSearchParams();
  const [payForExam] = usePayForExamMutation();
  const [subscribeToCourse] = useSubscribeToCourseMutation();
  const [subscribeToCourseBundle] = useSubscribeToCourseBundleMutation();
  const [updateShippingAddress] = useUpdateShippingAddressMutation();
  const [addOrder] = useAddOrderMutation();
  const nagadPaymentStatus = searchParams.get("status");
  const nagadPaymentRefId = searchParams.get("payment_ref_id");
  const payloadString = Cookies.get("creationPayload");
  const orderType = Cookies.get("order_type");
  const { books } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const processPayment = async () => {
      try {
        // if book ordered, create book payload
        let booksPayload;
        if (books?.length) {
          booksPayload = books?.map((book) => {
            return {
              book_id: book?._id,
              quantity: book?.quantity,
            };
          });
        }
        if (payloadString) {
          const payload = JSON.parse(payloadString);
          payload.payment_ref_id = nagadPaymentRefId;

          if (orderType === "subscription") {
            const res = await subscribeToCourse(payload);
            if (Boolean(res?.data)) {
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: "You  can now continue your buying subscribe course!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Error buying course! Contact to admin",
                icon: "error",
              });
            }
          } else if (orderType === "exam") {
            const res = await payForExam(payload);
            if (Boolean(res?.data)) {
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: "You  can now continue your buying subscribe course!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Error buying course! Contact to admin",
                icon: "error",
              });
            }
          } else if (orderType === "hard copy") {
            const shippingAddressPayload = {
              user_id,
              division: payload?.division,
              upazilla: payload?.upazilla,
              address: payload?.address,
              contact_no: payload?.contact_no,
              outside_dhaka: JSON.parse(payload?.outside_dhaka),
              billing_name: payload?.billing_name,
            };
            if (payload?.is_default) {
              await updateShippingAddress(shippingAddressPayload);
            }
            // create order
            const order = await addOrder({
              trx_id,
              shipping_address: JSON.stringify(shippingAddressPayload),
              books: booksPayload,
            });
            if (!!order) {
              dispatch(clearCart());
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: " Your order has been successfully.!",
                icon: "success",
              });
            } else {
              toast.error("Order creation failed!");
            }
          } else if (orderType === "bundle_course") {
            const res = subscribeToCourseBundle({
              sub_category_id: payload?.sub_category_id,
              subscription_duration_in_months:
                payload?.subscription_duration_in_months,
              trx_id,
            });

            if (!!res) {
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: " Your bundle course has been bought successfully.!",
                icon: "success",
              });
            } else {
              toast.error(
                "Order failed. Contact to easy learning platform admin!"
              );
            }
          }
        }
        if (orderType === "pdf") {
          const order = await addOrder({
            trx_id,
            books: booksPayload,
          });

          if (!!order) {
            dispatch(clearCart());
            Swal.fire({
              title: "Congratulations! Payment Successful",
              text: " Your order has been successfully.!",
              icon: "success",
            });
          } else {
            toast.error("Order creation failed!");
          }
        }
        Cookies.remove("order_type");
        Cookies.remove("creationPayload");
      } catch (error) {
        toast.error(
          "Order failed!  Contact to easy learning platform admin!",
          error
        );
      }
    };
    processPayment();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" flex  flex-col justify-center items-center my-10">
        <div className="flex justify-center flex-col items-center border w-fit p-12 bg-green-200">
          <div className="space-y-5">
            <div className="flex justify-center">
              <Image
                src={successImg}
                alt="success-img"
                width={400}
                height={200}
              />
            </div>
            <h3 className="text-5xl text-yellowPrimary pb-8">
              {" "}
              Your Payment is successful!
            </h3>
            <p className="pb-10 text-xl">
              You Can continue our paid services which have bought
            </p>
            <Link
              className="mt-8 bg-bluePrimary text-white py-5 px-10 transition-all duration-300 rounded hover:bg-cyanPrimary mr-5"
              href="/"
            >
              Go to Home
            </Link>
            <Link
              className="mt-8 bg-yellowPrimary text-white py-5 px-10 transition-all duration-300 rounded hover:bg-cyanPrimary"
              href="/profile"
            >
              Go to your Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
