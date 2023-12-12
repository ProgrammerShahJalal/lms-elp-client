"use client";

import Quiz from "@/components/ui/Home/Quiz";
import Link from "next/link";
import { useState } from "react";

const quizData = [
  {
    id: "1",
    question: "ব্যকরণ শব্দের অর্থ কী?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: "2",
    question: "What is the capital of BD?",
    options: ["Paris", "Bangladesh", "Madrid", "Rome"],
    correctAnswer: "Bangladesh",
  },
  {
    id: "3",
    question: "What is the capital of Noagan?",
    options: ["Paris", "Najipur", "Madrid", "Rome"],
    correctAnswer: "Najipur",
  },
  {
    id: "4",
    question: "What is the capital of Rome?",
    options: ["Paris", "Berlin", "avdd", "Rome"],
    correctAnswer: "avdd",
  },
  {
    id: "5",
    question: "What is the capital of americ?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Rome",
  },
  // Add more quiz data...
];

const BasicQuizPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSubmit = (answers) => {
    setUserAnswers(answers);
    setShowResults(true);
  };

  return (
    <div className=" px-14 text-center">
      <div className="py-16">
      <h2 className="text-2xl font-bold text-center">Welcome Jesmin </h2>
        {!showResults ? (
          <Quiz quizData={quizData} onSubmit={handleSubmit} />
        ) : (
          <div>
            <h2 className="text-2xl font-bold pb-5"> Congratulation!!! Your Results:</h2>
            <ul className="pb-10 ">
              {quizData.map((question, index) => (
                <li key={index}>
                  {question.question} - Your Answer: {userAnswers[index]}, Correct Answer:{" "}
                  {question.correctAnswer}
                </li>
              ))}
            </ul>

            <Link href="/" className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary ">Go Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicQuizPage;
