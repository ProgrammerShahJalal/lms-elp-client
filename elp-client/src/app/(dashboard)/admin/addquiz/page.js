'use client'
import React, { useEffect, useState } from 'react';
// import image1 from '../../../../../public/book.png'
// import image2 from '../../../../../public/images.jpeg'
// import image3 from '../../../../../public/images2.png'
// import image4 from '../../../../../public/arrow-down-2.png'
// import image5 from '../../../../../public/arrow-top-2.png'
import Image from 'next/image';
import { useAddQuizPlaylistMutation } from '@/redux/api/videoApi';
import { useGetAllExamsQuery } from '@/redux/api/examsApi';
import { useDeleteQuestionsMutation, useGetAllQuestionsQuery } from '@/redux/api/questionsApi';
import toast from 'react-hot-toast';
const AddQuiz = () => {
    // this is show quiz
    const { data: questions } = useGetAllQuestionsQuery();
    const allQuiz = questions?.categories?.data;
    const filteredQuestions = allQuiz?.filter(quiz => quiz.exam_type === '0');
    const [deleteQuestions] = useDeleteQuestionsMutation()
    // from here i show quiz
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleCheckboxChange = (questionId, option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [questionId]: { [option]: !prevOptions[questionId]?.[option] },
        }));
    };


    const [addQuizPlaylist] = useAddQuizPlaylistMutation();
    const { data } = useGetAllExamsQuery()
    const allData = data?.categories?.data;
    const filteredAllData = allData?.filter(quiz => quiz.exam_type === '0')
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct_answer: '',
        exam_id: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedExam = allData.find((exam) => exam.id === newQuestion.exam_id);
        const newData = {
            question: newQuestion.question,
            a: newQuestion.a,
            b: newQuestion.b,
            c: newQuestion.c,
            d: newQuestion.d,
            correct_answer: newQuestion.correct_answer,
            mark: 1,
            exam_id: selectedExam.id,

            exam_type: selectedExam.exam_type,
        };
        addQuizPlaylist(newData)

    };
    const handleDelete = async (categoryId) => {
        try {
            await deleteQuestions(categoryId);

        } catch (error) {
            toast.error('Failed to delete category')
        }
    }

    return (
        <>
            {/* <div className="p-8 lg:space-x-60 " style={{ background: 'linear-gradient(to left top, #fef1e8, #feeee9, #fdebeb, #f9e9ed, #f4e7ef, #f4e7ef, #f3e8f0, #f3e8f0, #f8ebf0, #fbeef0, #fdf2f1, #fef6f3)' }}>
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
            </div> */}
            <div className="container mx-auto mt-8">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Quiz Questions</h2>
                    <div className="mb-4">
                        <label htmlFor="examId" className="block text-sm font-medium text-gray-600">
                            Exam ID
                        </label>
                        <select
                            id="examId"
                            name="examId"
                            value={newQuestion.exam_id}
                            onChange={(e) => setNewQuestion({ ...newQuestion, exam_id: e.target.value })}
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled>Select Exam</option>
                            {filteredAllData &&
                                filteredAllData.map((exam) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.title}
                                    </option>
                                ))}
                        </select>
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
                            Add Quiz
                        </button>
                    </div>
                </form>
            </div>
            {/* here i make show quiz question */}
            {filteredQuestions?.map((quiz, index) => (
                <div key={quiz.id} className="mb-6 p-4  rounded">
                    <p className="text-lg font-bold">{index + 1}) {quiz.question}</p>
                    <form className="mt-2">
                        {['a', 'b', 'c', 'd'].map((option) => (
                            <div key={option} className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedOptions[quiz.id]?.[option]}
                                        onChange={() => handleCheckboxChange(quiz.id, option)}
                                    />
                                    <span>{quiz[option]}</span>
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            ))}
            {/* from here admin can delete quiz */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Question</th>
                            <th className="py-2 px-4 border-b">Option A</th>
                            <th className="py-2 px-4 border-b">Option B</th>
                            <th className="py-2 px-4 border-b">Option C</th>
                            <th className="py-2 px-4 border-b">Option D</th>
                            <th className="py-2 px-4 border-b">Correct Answer</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuestions?.map((quiz, i) => (
                            <tr key={quiz._id}>
                                <td className="py-2 px-4 border-b">{i + 1}) {quiz?.question}</td>
                                <td className="py-2 px-4 border-b">{quiz?.a}</td>
                                <td className="py-2 px-4 border-b">{quiz?.b}</td>
                                <td className="py-2 px-4 border-b">{quiz?.c}</td>
                                <td className="py-2 px-4 border-b">{quiz?.d}</td>
                                <td className="py-2 px-4 border-b">{quiz?.correct_answer}</td>
                                <td className="py-2 px-4 border-b">{quiz?.exam_id?.title}</td>
                                <td className="py-2 px-4 border-b md:table-cell">
                                    <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => handleDelete(quiz.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>


    );
};

export default AddQuiz;
