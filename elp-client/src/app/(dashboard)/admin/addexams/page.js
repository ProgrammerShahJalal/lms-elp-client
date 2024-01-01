'use client'

import GetAllExams from '@/components/dashboard/admin/GetAllExams';
import { useGetAllCoursesQuery } from '@/redux/api/courseApi';
import { useAddAllExamsMutation } from '@/redux/api/examsApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdminAddExams = () => {
    const [addAllExams] = useAddAllExamsMutation();
    const { data, isError, isLoading } = useGetAllCoursesQuery();
    const coursesData = data?.courses?.data;
    const [newQuestion, setNewQuestion] = useState({
        title: '',
        description: '',
        total_marks: 0,
        duration_in_minutes: 0,
        fee: 0,
        is_active: '',
        exam_type: ''
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
          
            
            const selectedExam = coursesData?.find((exam) => exam.id === newQuestion.exam_id);
            
            const formattedQuestion = {
                ...newQuestion,
                total_marks: parseInt(newQuestion.total_marks, 10),
                duration_in_minutes: parseInt(newQuestion.duration_in_minutes, 10),
                fee: parseInt(newQuestion.fee, 10),
                is_active: newQuestion.is_active === "true",
                course_id: selectedExam.id,
            };
    
            const result = addAllExams(formattedQuestion);
            if(result){
                toast.success("Exam added successfully")
            }
            // console.log(formattedQuestion);
        } catch (error) {
            // Handle the error here
            toast.error("An error occurred:", error);
            // console.error(error)
            // You can also perform additional actions or show user-friendly messages
        }
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit} className=" mx-auto bg-white p-8 border rounded shadow">
                <div className="mb-4">
                    <label htmlFor="examId" className="block text-sm font-medium text-gray-600">
                        Course Id
                    </label>
                    <select
                        id="examId"
                        name="examId"
                        value={newQuestion.exam_id}
                        onChange={(e) => setNewQuestion({ ...newQuestion, exam_id: e.target.value })}
                        required
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    >
                        <option value="" disabled>Select Exam</option>
                        {coursesData &&
                            coursesData?.map((exam) => (
                                <option key={exam?.id} value={exam?.id}>
                                    {exam?.title}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-600">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newQuestion.title}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={newQuestion.description}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="total_marks" className="block text-sm font-medium text-gray-600">
                        Total Marks
                    </label>
                    <input
                        type="number"
                        id="total_marks"
                        name="total_marks"
                        value={newQuestion.total_marks}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, total_marks: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration_in_minutes" className="block text-sm font-medium text-gray-600">
                        Duration in Minutes
                    </label>
                    <input
                        type="number"
                        id="duration_in_minutes"
                        name="duration_in_minutes"
                        value={newQuestion.duration_in_minutes}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, duration_in_minutes: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fee" className="block text-sm font-medium text-gray-600">
                        Fee
                    </label>
                    <input
                        type="number"
                        id="fee"
                        name="fee"
                        value={newQuestion.fee}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, fee: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="is_active" className="block text-sm font-medium text-gray-600">
                        Is Active
                    </label>
                    <select
                        id="is_active"
                        name="is_active"
                        value={newQuestion.is_active}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, is_active: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    >
                        <option value="" disabled>Select Exam</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="exam_type" className="block text-sm font-medium text-gray-600">
                        Exam Type
                    </label>
                    <select
                        id="exam_type"
                        name="exam_type"
                        value={newQuestion.exam_type}
                        required
                        onChange={(e) => setNewQuestion({ ...newQuestion, exam_type: e.target.value })}
                        className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                    >
                        <option value="" disabled>Select Exam</option>
                        <option value="0">Quiz</option>
                        <option value="1">Questions</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
                >
                    Add Exams
                </button>
            </form>

            <GetAllExams/>
        </div>
    );
};

export default AdminAddExams;
