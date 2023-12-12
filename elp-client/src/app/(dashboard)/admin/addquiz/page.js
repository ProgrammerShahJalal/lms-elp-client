'use client'
import React, { useEffect, useState } from 'react';
import image1 from '../../../../../public/book.png'
import image2 from '../../../../../public/images.jpeg'
import image3 from '../../../../../public/images2.png'
import image4 from '../../../../../public/arrow-down-2.png'
import image5 from '../../../../../public/arrow-top-2.png'
import Image from 'next/image';
const AddQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct_answer: '',
        exam_id: '',
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/quiz-questions')
            .then((response) => response.json())
            .then((data) => setQuestions(data.data))
            .catch((error) => console.error('Error fetching quiz questions:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(questions, 'this is questions');
        console.log(newQuestion, 'this is new question');
        // fetch('http://localhost:5000/api/v1/quiz-questions', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newQuestion),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setQuestions([...questions, data]);
        //         setNewQuestion({
        //             question: '',
        //             a: '',
        //             b: '',
        //             c: '',
        //             d: '',
        //             correct_answer: '',
        //             exam_id: newQuestion.exam_id,
        //         });
        //     })
        //     .catch((error) => console.error('Error adding new question:', error));
    };

    return (
        <>
            <div className="p-8 lg:space-x-60 " style={{ background: 'linear-gradient(to left top, #fef1e8, #feeee9, #fdebeb, #f9e9ed, #f4e7ef, #f4e7ef, #f3e8f0, #f3e8f0, #f8ebf0, #fbeef0, #fdf2f1, #fef6f3)' }}>
                <p className="text-black text-2xl text-center lg:ml-40">আমরা কি অফার করি</p>
                <h1 className="text-4xl font-bold mt-4 mb-4 text-black text-center ">EduVibe কিভাবে কাজ করে?</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className=" p-6 rounded-lg flex">
                        <div>
                            <Image src={image1} height={200} width={200} alt="This is image" className="mb-4 object-cover rounded-lg" />
                            <h1 className="text-xl font-bold mb-4 text-black">আপনার কোর্স ক্রয়</h1>
                            <p className="text-slate-600">আপনার ইচ্ছা অনুযায়ী যেকোন ধরনের কোর্স বেছে নিন</p>
                        </div>
                        <div>
                            <Image src={image4} height={200} width={200} alt="This is image" className="mb-4 mt-14 bobject-cover rounded-lg" />
                        </div>
                    </div>
                    <div className=" p-6 rounded-lg flex ">
                        <div>
                            <Image src={image2} height={200} width={200} alt="This is image" className="mb-4 object-cover rounded-lg" />
                            <h1 className="text-xl font-bold mb-4 text-black">যেকোনো কোর্স বেছে নিন</h1>
                            <p className="text-base text-slate-600">আপনি যখন আপনার কোর্স চয়ন করেন তারপর এটি কিনুন</p>
                        </div>
                        <div>
                            <Image src={image5} height={200} width={200} alt="This is image" className="mb-4 object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className=" p-6 rounded-lg ">
                        <Image src={image3} height={200} width={200} alt="This is image" className="mb-4 object-cover rounded-lg" />
                        <h1 className="text-xl font-bold mb-4 text-black">দারুণ! শিখতে শুরু করুন</h1>
                        <p className="text-base text-slate-600">অভিনন্দন! আপনার ড্যাশবোর্ডে যান এবং আপনার ক্লাস মডিউল দেখুন</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Quiz Questions</h2>
                    {/* Add new question form */}
                    <div className="mb-4">
                        <label htmlFor="examId" className="block text-sm font-medium text-gray-600">
                            Exam ID
                        </label>
                        <input
                            type="text"
                            id="examId"
                            name="examId"
                            value={newQuestion.exam_id}
                            onChange={(e) => setNewQuestion({ ...newQuestion, exam_id: e.target.value })}
                            className="mt-1 p-
                        8 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="question" className="block text-sm font-medium text-gray-600">
                            Question
                        </label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="optionA" className="block text-sm font-medium text-gray-600">
                            Option A
                        </label>
                        <input
                            type="text"
                            id="optionA"
                            name="optionA"
                            value={newQuestion.a}
                            onChange={(e) => setNewQuestion({ ...newQuestion, a: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="optionB" className="block text-sm font-medium text-gray-600">
                            Option B
                        </label>
                        <input
                            type="text"
                            id="optionB"
                            name="optionB"
                            value={newQuestion.b}
                            onChange={(e) => setNewQuestion({ ...newQuestion, b: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="optionC" className="block text-sm font-medium text-gray-600">
                            Option C
                        </label>
                        <input
                            type="text"
                            id="optionC"
                            name="optionC"
                            value={newQuestion.c}
                            onChange={(e) => setNewQuestion({ ...newQuestion, c: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="optionD" className="block text-sm font-medium text-gray-600">
                            Option D
                        </label>
                        <input
                            type="text"
                            id="optionD"
                            name="optionD"
                            value={newQuestion.d}
                            onChange={(e) => setNewQuestion({ ...newQuestion, d: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    {/* <div className="mb-4">
                    <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-600">
                        Correct Answer
                    </label>
                    <input
                        type="text"
                        id="correctAnswer"
                        name="correctAnswer"
                        value={newQuestion.correct_answer}
                        onChange={(e) => setNewQuestion({ ...newQuestion, correct_answer: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div> */}
                    <div className="mb-4">
                        <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-600">
                            Correct Answer
                        </label>
                        <select
                            id="correctAnswer"
                            name="correctAnswer"
                            value={newQuestion.correct_answer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, correct_answer: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled>Select Correct Answer</option>
                            <option value="a">Option A</option>
                            <option value="b">Option B</option>
                            <option value="c">Option C</option>
                            <option value="d">Option D</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
                        >
                            Add Question
                        </button>
                    </div>
                </form>
            </div>
        </>


    );
};

export default AddQuiz;