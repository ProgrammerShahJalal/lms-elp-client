'use client'

import { useExamResultQuery, useGetSingleSubmissionExamQuery } from "@/redux/api/resultApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";

const AllExamDetails = ({ item }) => {
    const isQuiz = item?.exam_id?.exam_type === '0';
    const { userId } = getUserInfo();
    const examId = item?.exam_id?._id;
    // const { data: examData } = useGetSingleSubmissionExamQuery(examId);
    const { data: examData } = useExamResultQuery(examId);
    console.log(examData);
    const [modalOpen, setIsModalOpen] = useState(false);
    return (
        <tr className="block md:table-row">
            <td className="py-2  px-1 border-b md:table-cell flex">{item?.user_id
                ?.name
            }</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.course_id?.title}</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.title}</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.duration_in_minutes
            } মিনিট</td>
            <td className="py-2 px-4 border-b md:table-cell"> {item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.fee} টাকা</td>
            <td className="py-2 px-4 border-b md:table-cell">{item?.exam_id?.total_marks}</td>
            <td className="py-2 px-4 border-b md:table-cell text-red-500"></td>
            {
                isQuiz ? (
                    <button>Nothing to do</button>
                ) : (
                    <button onClick={() => setIsModalOpen(true)} className="py-2 px-4 border-b md:table-cell text-red-500">মার্ক্স দিন</button >
                )
            }
            <dialog open={modalOpen} id={`my_modal_${examId}`} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <h1 className='font-bold '>Admin Give Marks Broad Question Ans: </h1>

                    </form>
                    <button onClick={() => { setIsModalOpen(false) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>

        </tr>
    );
};

export default AllExamDetails;