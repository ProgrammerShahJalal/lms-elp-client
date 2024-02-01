import { useState } from "react";
import SeeDynamicQuiz from "./SeeDynamicQuiz";

const AdminAddQuiz = ({ quiz, i, handleDelete, filteredQuestions }) => {
    const examId = quiz?.exam_id?._id;
    const examTitle = quiz?.exam_id?.title;
    const [openModal, setOpenModal] = useState(false);
    return (
        <tr>
            <td className="py-2 px-4 border-b text-center">
                {i + 1}) {quiz?.question}
            </td>
            <td className="py-2 px-4 border-b text-center">
                {quiz?.options?.map((option, index) => (
                    <div key={index}>
                        {Object.keys(option)[0]}: {Object.values(option)[0]}
                    </div>
                ))}
            </td>
            <td className="py-2 px-4 border-b text-center">{quiz?.correct_answer}</td>
            <td className="py-2 px-4 border-b"><button onClick={() => setOpenModal(true)}>{examTitle}</button></td>

            <td className="py-2 px-4 border-b md:table-cell">
                <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDelete(quiz.id)}
                >
                    Delete
                </button>
            </td>
            <dialog open={openModal} id={`my_modal_${examId}`} className="modal">
                <SeeDynamicQuiz examId={examId} filteredQuestions={filteredQuestions} examTitle={examTitle} setOpenModal={setOpenModal}></SeeDynamicQuiz>
            </dialog>
        </tr>
    );
};
export default AdminAddQuiz;