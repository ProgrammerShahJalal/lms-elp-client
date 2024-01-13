"use client";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import { useAddQuizPlaylistMutation, useDeleteQuestionsMutation, useGetAllQuestionsQuery } from "@/redux/api/questionsApi";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AddQuestions = () => {
  const [addQuizPlaylist] = useAddQuizPlaylistMutation();
  const { data } = useGetAllExamsQuery();
  const allData = data?.categories?.data;
  const filteredAllData = allData?.filter((quiz) => quiz.exam_type === "1");
  const { data: questions } = useGetAllQuestionsQuery();
  const allQuiz = questions?.categories?.data;
  const filteredQuestions = allQuiz?.filter((quiz) => quiz.exam_type === "1");
  const [deleteQuestions] = useDeleteQuestionsMutation();

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    mark: 0,
    exam_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
        const selectedExam = allData?.find(
            (exam) => exam?.id === newQuestion?.exam_id
          );
          console.log(selectedExam.id);
          const newData = {
            question: newQuestion.question,
            mark: parseInt(newQuestion.mark),
            exam_id: selectedExam.id,
            exam_type: selectedExam.exam_type,
          };
          const result = addQuizPlaylist(newData);
          if(result){
              console.log(newData);
              toast.success("question added successfully")
          }
      
    } catch (error) {
        // Handle the error here
        toast.error("An error occurred:", error);
        // console.error(error)
        // You can also perform additional actions or show user-friendly messages
    }
    
  };
  const handleDelete = async (categoryId) => {
    try {
      await deleteQuestions(categoryId);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 border rounded shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Add Broad questions</h2>
          <div className="mb-4">
            <label
              htmlFor="examId"
              className="block text-sm font-medium text-gray-600"
            >
              Exam ID
            </label>
            <select required
              id="examId"
              name="examId"
              value={newQuestion.exam_id}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, exam_id: e.target.value })
              }
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled >
                Select Exam
              </option>
              {filteredAllData &&
                filteredAllData?.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam?.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-600"
            >
              Question
            </label>
            <input required
              type="text"
              id="question"
              name="question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mark"
              className="block text-sm font-medium text-gray-600"
            >
              Mark
            </label>
            <input required
              type="number"
              id="mark"
              name="mark"
              value={newQuestion.mark}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, mark: e.target.value })
              }
              className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
            />
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Question</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions?.map((quiz, i) => (
                <tr key={quiz._id}>
                  <td className="py-2 px-4 border-b">
                    {i + 1}) {quiz?.question}
                  </td>
                  <td className="py-2 px-4 border-b">{quiz?.exam_id?.title}</td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
