'use client'
import { useState } from 'react';

const Quiz = ({ quizData, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));

  const handleOptionSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const isLastQuestion = currentQuestion === quizData.length - 1;

  return (
    <div className='space-y-7 text-center'>
      <h2 className="text-xl font-bold pt-5">Question {currentQuestion + 1}</h2>
      <p className=''>{quizData[currentQuestion].question}</p>
      <div>
        {quizData[currentQuestion].options.map((option, index) => (
          <label key={index} className=''>
            <input 
              type="radio" required
              name={`question${currentQuestion}`}
              value={option}
              checked={userAnswers[currentQuestion] === option}
              onChange={() => handleOptionSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        {currentQuestion > 0 && <button className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary mr-5"  onClick={handlePrevious}>Previous</button>}
        {isLastQuestion ? (
          <button onClick={() => onSubmit(userAnswers)} className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-bluePrimary" >Submit</button>
        ) : (
          <button onClick={handleNext} className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary" >Next</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
