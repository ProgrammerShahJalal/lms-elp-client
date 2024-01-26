'use client'

import { useGetAllQuestionsQuery, useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useExamResultQuery, useGetSingleSubmissionExamQuery, useGiveMarkToStudentMutation } from "@/redux/api/resultApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const AllExamDetails = ({ item }) => {
    const [giveMarkToStudent] = useGiveMarkToStudentMutation();
    const isQuiz = item?.exam_id?.exam_type === '0';
    const { userId } = getUserInfo();
    const examId = item?.exam_id?._id;
    const [modalOpen, setModalOpen] = useState(false);
    const { data: examResult } = useExamResultQuery({ exam_id: examId, user_id: item?.user_id?.id });
    const examResultData = examResult?.exams?.data[0];

    // const handleGiveAnswer = async (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const answer = form.answer.value;


    // };
    const handleGiveAnswer = async (e) => {
        e.preventDefault();
        const form = e.target;
        const answer = form.answer.value;


        try {
            const questionId = 5656;
            const existingQuestionMarks = examResultData?.question_mark || [];
            const updatedQuestionMarks = [...existingQuestionMarks];
            const questionIndex = updatedQuestionMarks.findIndex(qm => qm.question_id === questionId);

            if (questionIndex !== -1) {
                updatedQuestionMarks[questionIndex].mark_obtained = answer;
            } else {
                updatedQuestionMarks.push({
                    question_id: questionId,
                    mark_obtained: answer,
                });
            }

            const payload = {
                user_id: item?.user_id?.id,
                exam_id: examId,
                exam_type: examResultData?.exam_type,
                answer: answer,
                question_id: examResultData?.id,
                question_mark: updatedQuestionMarks,
                total_marks: examResultData?.total_marks,
                total_correct_answer: 0,
                total_wrong_answer: 0,
                isApproved: false
            };
            console.log(payload);

            const { data: submissionData } = await giveMarkToStudent(payload);

            if (submissionData) {
                toast.success("Congratulations! You have successfully submitted your answer");
            } else {
                toast.error("Your submission was not successful");
            }

            console.log('Submission successful:', submissionData);
        } catch (error) {
            console.error('Error submitting exam:', error);
        }
    };




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
            <td className="py-2 px-4 border-b md:table-cell">{
                examResultData?.exam_type === "1" ? <a href={examResultData?.answer} target="blank">See Ans</a> : "quiz exam"
            }</td>
            <td>this is empty</td>
            <td>{isQuiz ? (<button>Nothing to do</button>) : (<button onClick={() => setModalOpen(true)} className="py-2 px-4 border-b md:table-cell text-red-500">মার্ক্স দিন</button  >)}</td>


            <dialog open={modalOpen} id={`my_modal_${examId}`} className="modal">
                <div className="modal-box">
                    <form method="dialog" onSubmit={handleGiveAnswer}>
                        <h1 className='font-bold text-red-500'>Admin Give Mark</h1>
                        <div>
                            <h1>Also You can see ans Here --- <a className="font-bold text-red-500" href={examResultData?.answer} target="blank"> See Ans </a></h1>
                            <label
                                htmlFor="answer link"
                                className="block text-sm font-medium text-gray-600 mt-2 mb-2"
                            >
                                Give mark to  --- <span className="font-bold">{item?.user_id?.name}</span>
                            </label>
                            <input
                                type="text"
                                id=""
                                name="answer"
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full py-2 px-4 rounded-md mt-4"
                        >
                            Give Number
                        </button>
                    </form>
                    <button onClick={() => { setModalOpen(false) }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>

        </tr>
    );
};

export default AllExamDetails;