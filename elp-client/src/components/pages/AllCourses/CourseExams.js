import { authKey } from "@/constants/storage";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import { getUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function CourseExams({ course_id }) {
  const router = useRouter();
  const { data: dataExams } = useGetAllExamsQuery({
    course_id: course_id,
  });

  const enrollToExam = async (exam) => {
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
  return (
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
        <tbody>
          {!!examsData &&
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
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseExams;
