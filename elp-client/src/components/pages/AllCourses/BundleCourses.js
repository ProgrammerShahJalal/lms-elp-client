"use client";

import { getFromLocalStorage } from "@/utils/local-storage";
import BundleCourse from "./BundleCourse";
import Cookies from "js-cookie";
import axios from "axios";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";

const BundleCourses = ({ bundle, i, isLast, sub_category_id }) => {
  const router = useRouter();

  // handle form submit(payment and buy)
  const handleBundlePayment = async (subscription_duration_in_months) => {
    Cookies.set("order_type", "bundle_course");
    Cookies.set(
      "creationPayload",
      JSON.stringify({
        sub_category_id,
        subscription_duration_in_months: subscription_duration_in_months,
      })
    );

    const { data: payment } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
      {
        amount: `${Number(bundle?.total_cost)}`,
      },
      {
        withCredentials: true,
        headers: { Authorization: getFromLocalStorage(authKey) },
      }
    );
    router.push(payment?.data);
  };

  return (
    <div className={`mb-12 ${isLast ? "" : "pb-16 border-dashed border-b-2"}`}>
      <h2 className="text-4xl text-center mb-10 font-bold py-4">
        {bundle?.subscription_duration_in_months} মাসের কোর্স বান্ডিল
      </h2>

      <div className="flex justify-center gap-20">
        {bundle?.subscriptions.map((subscription) => (
          <BundleCourse
            key={subscription?.course_id}
            course_id={subscription?.course_id}
            cost={subscription?.cost}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="border rounded mt-10 ">
          <div className="py-5 px-5 flex flex-col justify-center items-center">
            <h3 className="text-xl text-center font-bold pb-5">
              {" "}
              মোট {bundle?.total_cost} টাকা
            </h3>
            <button
              onClick={() =>
                handleBundlePayment(bundle?.subscription_duration_in_months)
              }
              className="bg-yellowPrimary text-white py-3 px-10 transition-all duration-300 rounded  hover:bg-bluePrimary "
            >
              বান্ডিল কোর্সটি কিনুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCourses;
