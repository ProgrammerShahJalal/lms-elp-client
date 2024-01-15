"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { usePayForExamMutation } from "@/redux/api/examsApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSubscribeToCourseMutation } from "@/redux/api/courseApi";
import {
  useGetMyShippingAddressQuery,
  useUpdateShippingAddressMutation,
} from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import { useAddOrderMutation } from "@/redux/api/ordersApi";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Swal from "sweetalert2";
import successImg  from '../../../assets/images/success.svg'
import Image from "next/image";

function Success() {
  const user_id = getUserInfo()?.userId;
  const searchParams = useSearchParams();
  const { data: shippingAddress } = useGetMyShippingAddressQuery();
  const [payForExam] = usePayForExamMutation();
  const [subscribeToCourse] = useSubscribeToCourseMutation();
  const [updateShippingAddress] = useUpdateShippingAddressMutation();
  const [addOrder] = useAddOrderMutation();
  const trx_id = searchParams.get("trx_id");
  const payloadString = Cookies.get("creationPayload");
  const orderType = Cookies.get("order_type");

  useEffect(() => {
    const processPayment = async () => {
      try {
        if (payloadString) {
          const payload = JSON.parse(payloadString);
          payload.trx_id = trx_id;

          if (orderType === "subscription") {
            const res =await subscribeToCourse(payload);
            if(res){
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: "You  can now continue your buying subscribe course!",
                icon: "success"
              });
            }
            // toast("Success!");
          } else if (orderType === "exam") {
            const res= await payForExam(payload);
            if(res){
              Swal.fire({
                title: "Congratulations! Payment Successful",
                text: "You  can now continue your buying exam!",
                icon: "success"
              });
            }
            // toast("Success!");
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
            if (!shippingAddress || payload?.is_default) {
              await updateShippingAddress(shippingAddressPayload);
            }

            // create order
            const order = await addOrder({
              trx_id,
              shipping_address: JSON.stringify(shippingAddressPayload),
            });
            if (!!order) {
              
                Swal.fire({
                  title: "Congratulations! Payment Successful",
                  text: " Your order has been successfully.!",
                  icon: "success"
                });
              
              // toast("Order successfull!");
            } else {
              toast.error("Order creation failed!");
            }
          }
        }
        if (orderType === "pdf") {
          const order = await addOrder({
            trx_id,
          });

          if (!!order) {
            Swal.fire({
              title: "Congratulations! Payment Successful",
              text: " Your order has been successfully.!",
              icon: "success"
            });
            // toast("Order successfull!");
          } else {
            toast.error("Order creation failed!");
          }
        }
        Cookies.remove("order_type");
        Cookies.remove("creationPayload");
      } catch (error) {
        toast.error("Order creation failed! try");
      }
    };
    processPayment();
  }, []);

  return (
    <>
    <Navbar/>
    <div className=" flex  flex-col justify-center items-center my-10">
      <div className="flex justify-center flex-col items-center border w-fit p-12 bg-green-200">
         <div className="space-y-5">
          <div className="flex justify-center">
          <Image src={successImg} alt='success-img' width={400} height={200}/>
          </div>
         <h3 className="text-5xl text-yellowPrimary pb-8"> Your Payment is  successful!</h3>
         <p className="pb-10 text-xl">You Can continue our paid services which have bought</p>
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
    <Footer/>
    </>
  );
}

export default Success;
