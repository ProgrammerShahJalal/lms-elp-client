'use client'

import { useExamResultQuery } from "@/redux/api/resultApi";

const UserResult = () => {
  const { data, isLoading } = useExamResultQuery();
  const allExamData = data?.exams?.data;
  if (isLoading) {
    return (
      <div>
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <div>
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>

                <th>পরিক্ষা্র নাম </th>
                <th>পরিক্ষা্র ধরন</th>
                <th>পরিক্ষা্র মার্ক্স</th>
                <th>আপনার মার্ক্স</th>

              </tr>
            </thead>
            <tbody>
              {allExamData?.map((item, index) => (

                <tr key={index} className="hover">
                  <td>{item?.exam_id ? item.exam_id.title : 'N/A'}</td>
                  <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
                  <td>{item?.total_marks}</td>
                  <td>{item?.total_correct_answer}</td>
                </tr>
              ))
              }


            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserResult;