"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import UserExam from "@/components/dashboard/userDashboard/UserExam";
import { useGetMyExamPaymentQuery } from "@/redux/api/examsApi";
import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useParams } from "next/navigation";

const MyExamPages = () => {
  //     const params = useParams();
  //   const id = params?.id;
  const { data: payments, isError, isLoading } = useGetMyExamPaymentQuery();
  const paymentsData = payments?.payments;
  console.log(paymentsData);
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

  if (!isLoading && !isError && paymentsData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>Your don't buy any exam right now</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && paymentsData?.length > 0) {
    content = paymentsData?.map((item) => (
      <tr key={item?.id} className="hover">
        <th>কোর্স নাম </th>
        <td>{item?.exam_id?.title}</td>
        <td>{item?.exam_id?.fee}</td>
        <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
        <td>{item?.createdAt}</td>
        <td>{item?.trx_id}</td>
        <td>paid</td>
        <td>
            <button className="text-red-500 font-bold">পরিক্ষা দিন</button>
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

              {/* <tr className="hover">
        <th>প্রাইমারী কোর্স </th>
        <td>২০০০</td>
        <td>৪ ডিসেম্বর ২০২৩</td>
        <td>৪ ফেব্রুয়ারি ২০২৪</td>
        <td>Accepted</td>
        <td>paid</td>
      </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      {allExamsId?.map((item) => (
        <UserExam key={item} exam_id={item} />
      ))}
    </div>
  );
};

export default MyExamPages;
