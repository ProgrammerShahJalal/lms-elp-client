"use client";

import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import { authKey } from "@/constants/storage";
import { useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";
import { getUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const CourseSubscribe = () => {
    const router = useRouter();
  const { data, isError, isLoading } = useGetAllSubscriptionsQuery();
//   console.log(data?.subscriptions?.data, "from sub page");
  const allSubsCourses = data?.subscriptions?.data;

  const enrollToCourse = async (subscription) => {
    const coursePaymentPayload = {
      user_id: getUserInfo()?.userId,
      subscription_id: subscription?.id,
    };
    Cookies.set("creationPayload", JSON.stringify(coursePaymentPayload));

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
      {
        amount: `${subscription?.cost}`,
      },
      {
        withCredentials: true,
        headers: { Authorization: getFromLocalStorage(authKey) },
      }
    );
    router.push(data?.data);
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && allSubsCourses?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && allSubsCourses?.length > 0) {
    content = allSubsCourses?.map((item) => (
      <div key={item?._id} className="  rounded border shadow-md">
        <div className="card svg-card text-center p-4 ">
          <div className="flex justify-center">
            <span></span>
          </div>
          <div className="card-body">
            <h5 className="text-center font-bold text-xl">{item?.name}</h5>
            <h1 className="font-black text-xl">
              <sup>$</sup>
              {item?.cost}
            </h1>
            <p className="opacity-75 font-bold text-xl">
              duration: {item?.subscription_duration_in_months} Months
            </p>
            <p className="opacity-75 py-2">
              Course Title: {item?.course_id?.title}
            </p>
            <p className="opacity-75 py-2">
              Category: {item?.course_id?.category_id?.title}
            </p>
            <p className="opacity-75 py-2">Support : yes</p>
            <button  onClick={() => enrollToCourse(item)}
              className="bg-bluePrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary "
              href="/subscribe"
            >
              Buy Now
            </button>
          </div>
          <div className="custom-shape-divider-bottom-1645939714">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    ));
  }

  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কোর্স ", link: "/courses" },

    { label: "কোর্স সাবস্ক্রাইব" },
  ];

  return (
    <div>
      <Commonbanner
        title="কোর্স সাবস্ক্রাইব"
        breadcrumbItems={breadcrumbItems}
      />
      <div className="py-10 mx-14">
        <div className="grid lg:grid-cols-3 gap-4">{content}</div>
      </div>
    </div>
  );
};

export default CourseSubscribe;
