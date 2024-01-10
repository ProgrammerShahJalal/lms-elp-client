"use client"

import UserExam from "@/components/dashboard/userDashboard/UserExam";
import { useGetMyExamPaymentQuery } from "@/redux/api/examsApi";
import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useParams } from "next/navigation";

const MyExamPages = () => {
//     const params = useParams();
//   const id = params?.id;
const {data:payments} = useGetMyExamPaymentQuery()
const allExamsId = payments?.payments?.map((item)=>(item?.exam_id?._id))
console.log(allExamsId)
    
    return (
        <div>
            {allExamsId?.map((item)=><UserExam key={item} exam_id = {item}/>
)}
            <h2>Hello</h2> 
        </div>
    );
};

export default MyExamPages;