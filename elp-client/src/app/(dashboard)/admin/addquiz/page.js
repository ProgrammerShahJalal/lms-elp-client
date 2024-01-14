"use client";
import { useEffect, useState } from "react";

import { useGetAllExamsQuery } from "@/redux/api/examsApi";
import { useAddQuizPlaylistMutation, useDeleteQuestionsMutation, useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import toast from "react-hot-toast";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const AddQuiz = () => {
    // declaring states
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [addQuizPlaylist] = useAddQuizPlaylistMutation();
    const { data: questions } = useGetAllQuestionsQuery();
    const allQuiz = questions?.categories?.data;
    const filteredQuestions = allQuiz?.filter(quiz => quiz.exam_type === '0');

    const { data: categories } = useGetAllCategoriesQuery(undefined);
    const { data: subCategories, refetch: refetchSubCategories } =
        useGetAllSubcategoriesQuery({
            category_id: selectedCategory,
        });
    const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
        sub_category_id: selectedSubcategory,
    });
    const allCourse = courses?.courses?.data;
    const { data: exams, refetch: refetchExams } = useGetAllExamsQuery({
        course_id: selectedCourse,
    });
    const allExams = exams?.exams?.data;

    const [deleteQuestions] = useDeleteQuestionsMutation();
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct_answer: "",
        exam_id: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedExam = allExams?.find(
            (exam) => exam.id === newQuestion.exam_id
        );
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
        const res = await addQuizPlaylist(newData);
        // console.log(res)
        if(res){
          toast.success("Quiz added successfully")
        }
    };
    // console.log(selectedExam?.id, 'this is selected exam');
    const handleDelete = async (categoryId) => {
        try {
            const res= await deleteQuestions(categoryId);
            if(res){
              toast.success("Quiz deleted successfully")
            }
        } catch (error) {
            toast.error("Failed to delete category");
        }
    };

    useEffect(() => {
        const fetchSubCategory = async () => {
            await refetchSubCategories({ category_id: selectedCategory });
        };
        fetchSubCategory();
    }, [selectedCategory]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            await refetchCourses({ sub_category_id: selectedSubcategory });
        };
        fetchSubCategories();
    }, [selectedSubcategory]);

    useEffect(() => {
        const fetchExams = async () => {
             await refetchExams({ course_id: selectedCourse });
            
        };
        fetchExams();
    }, [selectedCourse]);
    
    const handleCheckboxChange = (questionId, option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [questionId]: { [option]: true },
        }));
    };


    return (
        <>
            <div className="container mx-auto mt-8">
                <form
                    onSubmit={handleSubmit}
                    className=" mx-auto  p-8 border rounded shadow"
                >
                    <h2 className="text-2xl font-semibold mb-4">Quiz Questions</h2>
                    <div>
                        {/* Category selection field */}
                        <div className="mb-4">
                            <label
                                htmlFor="categories"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Categories
                            </label>
                            <select
                                id="categories"
                                name="categories"
                                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select a category
                                </option>
                                {categories &&
                                    categories?.categories?.map((category) => (
                                        <option key={category?.id} value={category?.id}>
                                            {category.title}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Sub category selection field */}
                        <div className="mb-4">
                            <label
                                htmlFor="subcategories"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Subcategories
                            </label>
                            <select
                                id="subcategories"
                                name="subcategories"
                                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                                disabled={!selectedCategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select a sub category
                                </option>
                                {!!subCategories &&
                                    subCategories?.subcategories?.map((subCategory) => (
                                        <option key={subCategory?.id} value={subCategory?.id}>
                                            {subCategory?.title}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Course selection field */}
                        <div className="mb-4">
                            <label
                                htmlFor="courses"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Select Courses
                            </label>
                            <select
                                id="courses"
                                name="courses"
                                disabled={!selectedSubcategory}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                            >
                                <option value="" disabled selected>
                                    Select a course
                                </option>
                                {allCourse?.length === 0 ? (
                                    <option value="" disabled>
                                        No courses available
                                    </option>
                                ) : (
                                    allCourse?.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Exam Selection field */}
                        <div className="mb-4">
                            <label
                                htmlFor="exam"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Select Exam
                            </label>
                            <select
                                id="exam"
                                name="exam"
                                className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                                disabled={!selectedCourse}

                                value={newQuestion.exam_id}
                                onChange={(e) => setNewQuestion({ ...newQuestion, exam_id: e.target.value })}
                            >
                                <option value="" disabled selected>
                                    Select an Exam
                                </option>
                                {exams?.exams?.data.length === 0 ? (
                                    <option value="" disabled>
                                        No exam available
                                    </option>
                                ) : (
                                    exams?.exams?.data?.map((exam) => (
                                        <option key={exam.id} value={exam.id}>
                                            {exam.title}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="question"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Question
                        </label>
                        <input
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
                            htmlFor="optionA"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Option A
                        </label>
                        <input
                            type="text"
                            id="optionA"
                            name="optionA"
                            value={newQuestion.a}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, a: e.target.value })
                            }
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="optionB"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Option B
                        </label>
                        <input
                            type="text"
                            id="optionB"
                            name="optionB"
                            value={newQuestion.b}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, b: e.target.value })
                            }
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="optionC"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Option C
                        </label>
                        <input
                            type="text"
                            id="optionC"
                            name="optionC"
                            value={newQuestion.c}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, c: e.target.value })
                            }
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="optionD"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Option D
                        </label>
                        <input
                            type="text"
                            id="optionD"
                            name="optionD"
                            value={newQuestion.d}
                            onChange={(e) =>
                                setNewQuestion({ ...newQuestion, d: e.target.value })
                            }
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
                        <label
                            htmlFor="correctAnswer"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Correct Answer
                        </label>
                        <select
                            id="correctAnswer"
                            name="correctAnswer"
                            value={newQuestion.correct_answer}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    correct_answer: e.target.value,
                                })
                            }
                            className="mt-1 p-3 border rounded w-full focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled>
                                Select Correct Answer
                            </option>
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
                    <p className="text-lg font-bold">
                        {index + 1}) {quiz.question}
                    </p>
                    {/* inside the question form */}
                    <div>
                        {["a", "b", "c", "d"].map((option) => (
                            <div key={option} className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="mr-2"
                                        name={`answer_${index}`}
                                        checked={selectedOptions[quiz._id]?.[option]}
                                        onChange={() => handleCheckboxChange(quiz._id, option)}
                                    />
                                    <span>{quiz[option]}</span>
                                </label>
                            </div>
                        ))}
                    </div>
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
                                <td className="py-2 px-4 border-b">
                                    {i + 1}) {quiz?.question}
                                </td>
                                <td className="py-2 px-4 border-b">{quiz?.a}</td>
                                <td className="py-2 px-4 border-b">{quiz?.b}</td>
                                <td className="py-2 px-4 border-b">{quiz?.c}</td>
                                <td className="py-2 px-4 border-b">{quiz?.d}</td>
                                <td className="py-2 px-4 border-b">{quiz?.correct_answer}</td>
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
        </>
    );
};

export default AddQuiz;
