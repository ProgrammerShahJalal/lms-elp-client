import Link from 'next/link';
import React from 'react';

const SinglePaymentDetails = ({ item }) => {
  const dateObject = new Date(item?.createdAt);
  const localData = dateObject.toLocaleDateString();
  const isQuiz = item?.exam_id?.exam_type === "0";
  const handleSubmitPdf = async (e) => {
    e.preventDefault()
    const form = e.target;
    const answerForm = form.answer.value;
    console.log(answerForm);
  }
  return (
    <tr className="hover">
      <th>{item?.exam_id?.course_id?.title} </th>
      <td>{item?.exam_id?.title}</td>
      <td>{item?.exam_id?.fee}</td>
      <td>{item?.exam_id?.exam_type === "0" ? 'Quiz' : 'Questions'}</td>
      <td>{localData}</td>
      <td>{item?.trx_id}</td>
      <td>paid</td>
      <td>
        {isQuiz ? (
          <Link href={`/user/myexams/details/${item?.exam_id?.id}`} className="text-red-500 font-bold">
            পরিক্ষা দিন
          </Link>
        ) : (

          <button onClick={() => document.getElementById('my_modal_3').showModal()} className="your-button-styles">Your Button Text</button>
        )}
      </td>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmitPdf}>
            <div>
              <label
                htmlFor="answer link"
                className="block text-sm font-medium text-gray-600"
              >
                Give Pdf Url:
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
              Submit Your Answer
            </button>
          </form>
          <button onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </dialog>
    </tr>
  );
};

export default SinglePaymentDetails;