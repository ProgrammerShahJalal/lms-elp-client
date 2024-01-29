'use client'

import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetAllSubscriptionsHistoryQuery, useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";
import Image from "next/image";
import Link from "next/link";
import AllBuyingCourseDetails from "./AllBuyingCourseDetails";
import { useState } from "react";


const AllBuyingCourses = () => {
    const { data, isLoading, isError } =
    useGetAllSubscriptionsHistoryQuery({limit: 1000});
    console.log(data?.subscriptionsHistory?.data)

  const courseSubs = data?.subscriptionsHistory?.data;

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; 

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = courseSubs?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  } else if (isError) {
    content = (
      <div className="flex justify-center items-center font-bold bg-green-400 text-white py-3 rounded text-lg">
        <h5>No one has bought any course yet.</h5>
      </div>
    );
  } else if (courseSubs?.length === 0) {
    content = <EmptyContent />;
  } else {
    content = currentItems?.map((item) => (
      <AllBuyingCourseDetails key={item?._id} item={item} />
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
              <th>কোর্সের নাম</th>
              <th>কোর্স প্রশিক্ষক</th>
                <th>কোর্সের সময় </th>
                <th>কোর্সের ক্যাটাগরি </th>
                <th>কোর্সের সাবক্যাটাগরি</th>
                <th> কোর্সের মূল্য</th>
                <th>প্রকাশের তারিখ</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    
 {/* Pagination controls */}
 <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(courseSubs?.length / ITEMS_PER_PAGE) }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`mx-2 px-4 py-2 rounded-full ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
     
    </div>
    );
};

export default AllBuyingCourses;