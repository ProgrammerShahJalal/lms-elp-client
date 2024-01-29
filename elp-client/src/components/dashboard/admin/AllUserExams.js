"use client";

import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetAllUserExamsQuery } from "@/redux/api/examsApi";
import AllExamDetails from "./AllExamDetails";

const AllUserExams = () => {
  const { data, isLoading, isError } = useGetAllUserExamsQuery();
  // console.log(data?.exams);
  const allExams = data?.exams;
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

  if (!isLoading && !isError && allExams?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }
  if (!isLoading && !isError && allExams?.length > 0) {
    content = allExams?.map((item) => <AllExamDetails key={item?.id} item={item} />)
  }
  return (
    <div className="py-10">
      <h2 className="text-xl font-bold py-5"> All students Exams List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-2 px-2 border-b">ছাত্রী/ছাত্রের নাম</th>
              <th className="py-2 px-2 border-b">কোর্সের নাম</th>
              {/* <th className="py-2 px-4 border-b">কোর্সের ক্যাটাগরি</th> */}
              <th className="py-2 px-2 border-b">পরিক্ষার নাম</th>
              <th className="py-2 px-2 border-b"> পরিক্ষার সময় </th>
              <th className="py-2 px-2 border-b">পরিক্ষার ধরন</th>
              <th className="py-2 px-2 border-b">পরিক্ষার ফী</th>
              <th className="py-2 px-2 border-b">টোটাল মার্ক্স</th>
              <th className="py-2 px-2 border-b">উত্তর দেখুন</th>
              <th className="py-2 px-2 border-b">প্রাপ্ত মার্ক্স</th>
              <th className="py-2 px-2 border-b">নম্বর দিন</th>


            </tr>
          </thead>
          <tbody>
            {content}

            {/* <tr className="block md:table-row">
              <td className="py-2  px-1 border-b md:table-cell flex">রমজান</td>
              <td className="py-2 px-4 border-b md:table-cell">বাংলা</td>
              <td className="py-2 px-4 border-b md:table-cell">লিখিত </td>
              <td className="py-2 px-4 border-b md:table-cell">৩০ মিনিট</td>
              <td className="py-2 px-4 border-b md:table-cell"> প্রশ্ন</td>
              <td className="py-2 px-4 border-b md:table-cell">২০০ টাকা</td>
              <td className="py-2 px-4 border-b md:table-cell text-red-500"> মার্ক্স দিন</td>
              
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserExams;
