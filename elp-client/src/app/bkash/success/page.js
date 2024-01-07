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
            await subscribeToCourse(payload);
            toast("Success!");
          } else if (orderType === "exam") {
            await payForExam(payload);
            toast("Success!");
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
              toast("Order successfull!");
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
            toast("Order successfull!");
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
    <div className="h-screen flex  flex-col justify-center items-center">
      <div className="flex justify-center flex-col items-center border w-fit p-12 bg-green-200">
        <h3>Payment successfull!</h3>
      </div>
      <Link
        className="mt-8 bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
        href="/"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Success;
