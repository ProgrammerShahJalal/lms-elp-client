'use client'

import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetAllSubscriptionsHistoryQuery, useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";
import Image from "next/image";
import Link from "next/link";
import AllBuyingCourseDetails from "./AllBuyingCourseDetails";

const AllBuyingCourses = () => {
    const { data, isLoading, isError } =
    useGetAllSubscriptionsHistoryQuery();
    console.log(data?.subscriptionsHistory?.data)

  const courseSubs = data?.subscriptionsHistory?.data;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
        <h5>No One buy  any course yet now</h5>
      </div>
    );
  }

  if (!isLoading && !isError && courseSubs?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && courseSubs?.length > 0) {
    content = courseSubs?.map((item) => (<AllBuyingCourseDetails  key={item?._id} item={item}/>
    ));
  }

    return (
        <div className="">

<div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="">
                <th>কোর্স সাবসক্রাইব নাম </th>
                <th>কোর্সের সময় </th>
                <th>কোর্সের নাম </th>
                <th>কোর্সের ক্যাটাগরি </th>
                <th>কোর্সের ধরন </th>

                <th> কোর্সের  মূল্য</th>
                <th>কেনার তারিখ</th>
                <th>পেমেন্ট</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    

     
    </div>
    );
};

export default AllBuyingCourses;