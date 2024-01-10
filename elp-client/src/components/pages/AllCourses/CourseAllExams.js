'use client'
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { authKey } from "@/constants/storage";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import { getUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const CourseAllExams = ({course_id}) => {
    const router = useRouter();
    const { data: dataExams , isLoading, isError} = useGetAllExamsQuery({
      course_id: course_id,
    });


  
    const enrollToExam = async (exam) => {
    
      console.log(exam, 'from enroll')
      const examPaymentPayload = {
        user_id: getUserInfo()?.userId,
        exam_id: exam?.id,
      };
  
      Cookies.set("order_type", "exam");
      Cookies.set("creationPayload", JSON.stringify(examPaymentPayload));
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
        {
          amount: `${exam?.fee}`,
        },
        {
          withCredentials: true,
          headers: { Authorization: getFromLocalStorage(authKey) },
        }
      );
      router.push(data?.data);
    };
    const examsData = dataExams?.exams?.data;

let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error></Error>;
  }
  if (!isLoading && !isError && examsData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg mt-5">
      <h5>There is No Quiz In this course now</h5>
    </div>
      </>
    );
  }
  if (!isLoading && !isError && examsData?.length >0) {
    content = examsData?.map((exam) => (
        <tr className="hover " key={exam?._id} >
          <th className="text-gray-400">#</th>
          <td>{exam?.title}</td>
          <td>{exam?.exam_type == "0" ? "MCQ" : "Written"}</td>
          <td>{exam?.total_marks}</td>
          <td>{exam?.fee}</td>
          <td>
            <p
              onClick={() => enrollToExam(exam)}
              className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
            >
              Enroll
            </p>
          </td>
        </tr>
      ))}

    return (
        <div className="mx-20 py-20 ">
             <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Exam Title</th>
            <th>Exam Type</th>
            <th>Total Marks</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
            {content}
          {/* {!!examsData &&
            examsData?.map((exam) => (
              <tr className="hover" key={exam?._id}>
                <th className="text-gray-400">#</th>
                <td>{exam?.title}</td>
                <td>{exam?.exam_type == "0" ? "MCQ" : "Written"}</td>
                <td>{exam?.total_marks}</td>
                <td>{exam?.fee}</td>
                <td>
                  <p
                    onClick={() => enrollToExam(exam)}
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
                  >
                    Enroll
                  </p>
                </td>
              </tr>
            ))} */}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default CourseAllExams;