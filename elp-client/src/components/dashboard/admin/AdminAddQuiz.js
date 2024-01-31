import { useState } from "react";
import SeeDynamicQuiz from "./SeeDynamicQuiz";

const AdminAddQuiz = ({ quiz, i, handleDelete }) => {
    const examId = quiz?.exam_id?._id;
    const [openModal, setOpenModal] = useState(false);
    return (
        <tr>
            <td className="py-2 px-4 border-b"><button onClick={() => setOpenModal(true)}>{quiz?.exam_id?.title}</button></td>

            <td className="py-2 px-4 border-b md:table-cell">
                <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDelete(quiz.id)}
                >
                    Delete
                </button>
            </td>
            <dialog open={openModal} id={`my_modal_${examId}`} className="modal">
                <SeeDynamicQuiz examId={examId} quiz={quiz} i={i} setOpenModal={setOpenModal}></SeeDynamicQuiz>
            </dialog>
        </tr>
    );
};
export default AdminAddQuiz;