'use client'
// import Error from "@/components/Loader/Error";
// import InitialLoader from "@/components/Loader/InitialLoader";
// import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
// import { useState } from "react";



// const UserExamPage = ({params}) => {
//     const {id} = params;

//     const {data,isLoading,isError} = useGetMyQuestionsEnrollHistoryQuery(id);
//     const [selectedOptions, setSelectedOptions] = useState({});
//     const handleCheckboxChange = (questionId, option) => {
//         setSelectedOptions((prevOptions) => ({
//             ...prevOptions,
//             [questionId]: { [option]: true },
//         }));
//     };
//     // console.log(data)
//     let content = null;

//   if (isLoading) {
//     content = (
//       <>
//         <InitialLoader/>
//       </>
//     );
//   }

//   if (!isLoading && isError) {
//     content = <Error/>;
//   }

//   if (!isLoading && !isError && data?.length === 0) {
//     content = (
//       <>
//         {" "}
//         <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
//       <h5>You don't buy any exam right now</h5>
//     </div>
//       </>
//     );
//   }

//   if (!isLoading && !isError && data?.length > 0) {
//     content =   data?.map((quiz, index) => (
//         <div key={quiz.id} className="mb-6 p-4  rounded">
//             <p className="text-lg font-bold">
//                 {index + 1}) {quiz.question}
//             </p>
//             {/* inside the question form */}
//             <div>
//                 {["a", "b", "c", "d"].map((option) => (
//                     <div key={option} className="mb-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 className="mr-2"
//                                 name={`answer_${index}`}
//                                 checked={selectedOptions[quiz._id]?.[option]}
//                                 onChange={() => handleCheckboxChange(quiz._id, option)}
//                             />
//                             <span>{quiz[option]}</span>
//                         </label>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     ));
//   }
    
//     return (
//         <div>
//             {content}
//         </div>
//     );
// };

// export default UserExamPage;

// import Error from "@/components/Loader/Error";
// import InitialLoader from "@/components/Loader/InitialLoader";
// import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
// import { useState } from "react";

// const UserExamPage = ({ params }) => {
//   const { id } = params;

//   const { data, isLoading, isError } = useGetMyQuestionsEnrollHistoryQuery(id);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

//   const handleCheckboxChange = (questionId, option) => {
//     setSelectedOptions((prevOptions) => ({
//       ...prevOptions,
//       [questionId]: { [option]: true },
//     }));
//     setSubmitButtonDisabled(false); // Enable the submit button when a quiz is selected
//   };

//   // const handleSubmit = () => {
//   //   // Perform submission logic here

//   //   // For demonstration purposes, display an alert with quiz summary
//   //   const totalQuestions = Object.keys(selectedOptions).length;
//   //   const totalCorrectAnswers = /* Your logic to calculate correct answers */
//   //   const totalWrongAnswers = totalQuestions - totalCorrectAnswers;

//   //   alert(
//   //     `Quiz Summary\n\nTotal Questions: ${totalQuestions}\nTotal Correct Answers: ${totalCorrectAnswers}\nTotal Wrong Answers: ${totalWrongAnswers}`
//   //   );
//   // };


//   // ...

// const handleSubmit = () => {
//   // Perform submission logic here

//   // Calculate total correct answers
//   const totalCorrectAnswers = data.reduce((total, quiz) => {
//     const selectedOption = selectedOptions[quiz._id];
//     const correctOption = quiz.correctOption; // Assuming the correct option is specified in quiz.correctOption

//     // Check if the selected option matches the correct option
//     if (selectedOption && selectedOption[correctOption]) {
//       return total + 1;
//     }

//     return total;
//   }, 0);

//   const totalQuestions = Object.keys(selectedOptions).length;
//   const totalWrongAnswers = totalQuestions - totalCorrectAnswers;

//   alert(
//     `Quiz Summary\n\nTotal Questions: ${totalQuestions}\nTotal Correct Answers: ${totalCorrectAnswers}\nTotal Wrong Answers: ${totalWrongAnswers}`
//   );
// };

// // ...

//   let content = null;

//   if (isLoading) {
//     content = (
//       <>
//         <InitialLoader />
//       </>
//     );
//   }

//   if (!isLoading && isError) {
//     content = <Error />;
//   }

//   if (!isLoading && !isError && data?.length === 0) {
//     content = (
//       <>
//         {" "}
//         <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
//           <h5>You don't buy any exam right now</h5>
//         </div>
//       </>
//     );
//   }

//   if (!isLoading && !isError && data?.length > 0) {
//     content = data?.map((quiz, index) => (
//       <div key={quiz.id} className="mb-6 p-4  rounded">
//         <p className="text-lg font-bold">
//           {index + 1}) {quiz.question}
//         </p>
//         {/* inside the question form */}
//         <div>
//           {["a", "b", "c", "d"].map((option) => (
//             <div key={option} className="mb-2">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   className="mr-2"
//                   name={`answer_${index}`}
//                   checked={selectedOptions[quiz._id]?.[option]}
//                   onChange={() => handleCheckboxChange(quiz._id, option)}
//                 />
//                 <span>{quiz[option]}</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     ));
//   }

//   return (
//     <div>
//     {content}
//     <button
//       onClick={handleSubmit}
//       disabled={isSubmitButtonDisabled}
//       className={`py-2 px-4 rounded ${isSubmitButtonDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//     >
//       Submit
//     </button>
//   </div>
//   );
// };

// export default UserExamPage;


import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetMyQuestionsEnrollHistoryQuery } from "@/redux/api/questionsApi";
import { useState } from "react";
import Swal from "sweetalert2";

const UserExamPage = ({ params }) => {
  const { id } = params;

  const { data, isLoading, isError } = useGetMyQuestionsEnrollHistoryQuery(id);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});
  
  // Calculate totalQuestions when needed
  const totalQuestions = Object.keys(selectedOptions).length;

  const handleCheckboxChange = (questionId, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: { [option]: true },
    }));
    setSubmitButtonDisabled(false);
  };

  const handleSubmit = () => {
    const totalCorrectAnswers = data.reduce((total, quiz) => {
      const selectedOption = selectedOptions[quiz.id];
      const correctOption = quiz.correct_answer;

      setCorrectAnswers((prevCorrectAnswers) => ({
        ...prevCorrectAnswers,
        [quiz.id]: correctOption,
      }));

      if (selectedOption && selectedOption[correctOption]) {
        return total + 1;
      }

      return total;
    }, 0);

    const totalWrongAnswers = totalQuestions - totalCorrectAnswers;

    Swal.fire({
      title: 'Quiz Summary',
      html: `<p>Total Questions: ${totalQuestions}</p>
             <p>Total Correct Answers: ${totalCorrectAnswers}</p>
             <p>Total Wrong Answers: ${totalWrongAnswers}</p>`,
      icon: 'info',
    });
  
    setQuizSubmitted(true);
  };
    // setQuizSubmitted(true);
  

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

  if (!isLoading && !isError && data?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>You don't buy any exam right now</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((quiz,i) => (
      <div key={quiz.id} className="mb-6 p-4  rounded">
        <p className="text-lg font-bold">
          Question {i+1}: {quiz.question}
        </p>
        <div>
          {["a", "b", "c", "d"].map((option) => (
            <div key={option} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name={`answer_${quiz.id}`}
                  checked={selectedOptions[quiz.id]?.[option]}
                  onChange={() => handleCheckboxChange(quiz.id, option)}
                />
                <span>{quiz[option]}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  return (
    <div>
      {content}
      <button
        onClick={handleSubmit}
        disabled={isSubmitButtonDisabled}
        className={`py-2 px-4 rounded ${isSubmitButtonDisabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Submit
      </button>

      {quizSubmitted && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Quiz Results</h2>
         

          <div className="mt-2">
            {data.map((quiz,index) => (<>
              <p key={quiz.id}>
                Question {index}: Correct Answer - {correctAnswers[quiz.id]}
              </p>
              <p> Your Answer - {selectedOptions[quiz.id] && Object.keys(selectedOptions[quiz.id])[0]}</p>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserExamPage;

