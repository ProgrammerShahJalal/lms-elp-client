"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";

import { useGetMyExamPaymentQuery } from "@/redux/api/examsApi";

import Link from "next/link";


const MyExamPages = () => {
 
  const { data: payments, isError, isLoading } = useGetMyExamPaymentQuery();
  const paymentsData = payments?.payments;
 
  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    // content = <Error />;
     content = <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 px-3  my-5 rounded text-lg">
     <h5>Your don't buy any exam right now</h5>
   </tr>;
  }

  if (!isLoading && !isError && paymentsData?.length === 0) {
    content = (
      <>
        {" "}
        <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>Your don't buy any exam right now</h5>
        </tr>
      </>
    );
  }

  if (!isLoading && !isError && paymentsData?.length > 0) {
    content = paymentsData?.map((item) => (
      <tr key={item?.id} className="hover">
        <th>{item?.exam_id?.course_id?.title} </th>
        <td>{item?.exam_id?.title}</td>
        <td>{item?.exam_id?.fee}</td>
        <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
        <td>{item?.createdAt}</td>
        <td>{item?.trx_id}</td>
        <td>paid</td>
        <td>
        <Link href={`/user/myexams/details/${item?.exam_id?.id}`}className="text-red-500 font-bold">পরিক্ষা দিন</Link>
        </td>
      </tr>
    ));
  }

  const allExamsId = payments?.payments?.map((item) => item?.exam_id?._id);
  // console.log(allExamsId)

  return (
    <div>
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>কোর্স নাম </th>
                <th>পরিক্ষা্র নাম </th>
                <th>পরিক্ষা ফী </th>
                <th>পরিক্ষা্র ধরন</th>
                <th>কেনার তারিখ</th>
                <th>ট্রান্সজেকশন আইডি</th>
                <th>পেমেন্ট</th>
                <th>পরিক্ষা দিন</th>
              </tr>
            </thead>
            <tbody>
              {content}

             
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
  );
};

export default MyExamPages;
