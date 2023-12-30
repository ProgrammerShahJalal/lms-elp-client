"use client";
import React, { useState } from "react";
// import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
// import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
// import {
//   useAddCourseMutation,
//   useDeleteCoursesMutation,
//   useGetAllCoursesQuery,
// } from "@/redux/api/courseApi";
// import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useAddCourseMutation, useDeleteCoursesMutation, useGetAllCoursesQuery } from "@/redux/api/courseApi";

const AddCourseForm = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery();
 
  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    isError: isErrorSubcategories,
  } = useGetAllSubcategoriesQuery();
  const allSubcategory =subcategories?.subcategories;

  const { data: courses, isLoading: isSubcategoryLoading } =
    useGetAllCoursesQuery();
  const allCourses = courses?.courses?.data;
 const[addCourse] = useAddCourseMutation();
 const [deleteCourses] = useDeleteCoursesMutation();

  const { register, handleSubmit, reset, setValue } = useForm();

//   const toolbarOptions = [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ 'header': 1 }, { 'header': 2 }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     [{ 'script': 'sub' }, { 'script': 'super' }],
//     [{ 'indent': '-1' }, { 'indent': '+1' }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
   
//     ['clean']
// ];



const onSubmit = async (data) => {
    // console.log(data, 'input daa');
    

    const content = { ...data };

    const file = content["file"];
    // console.log(file)
    // delete content['file'];
    const result = JSON.stringify(content);
    // console.log(result, "json")
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);
    // console.log(formData, 'formdaata')
    try {
  
      const resultData = await addCourse(formData);
    
      if (resultData) {
        toast.success("course created successfully");
      }
      // console.log(resultData, ' from add category async')
    } catch (error) {
      toast.error(error.message);
    }
  };




  // handle delete course function

  const handleDelete = async (courseId) => {
    try {
      
      const result = await deleteCourses(courseId);
      // console.log(result)

      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Course Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", { required: true })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            {...register("author", { required: true })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select

            {...register("category_id", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.categories?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Sub Category</label>
          <select

            {...register("sub_category_id", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {allSubcategory?.map((subCategory) => (
              <option key={subCategory?.id} value={subCategory?.id}>
                {subCategory?.title}
              </option>
            ))}
          </select>
        </div>

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Membership Type:
          </label>
          <select
            name="membership_type"
            {...register("membership_type", { required: true })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="" disabled>
              Select membership type
            </option>
            <option value="0">Paid</option>
            <option value="1">Free</option>
          </select>
        </div>

       




     
        <div className="mb-4">
        <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <input
              id="description"
              name="description"
              // theme="snow"
              // modules={{ toolbar: toolbarOptions }}
              {...register("description", { required: true })}
              className="mt-1 p-2 border rounded-md w-full"
            />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Syllabus:
          </label>
          <input
            type="text"
            id="syllabus"
            name="syllabus"
            {...register("syllabus", { required: true })}

            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
          Study Materials:
          </label>
          <input
            type="text"
            id="study_materials"
            name="study_materials"
            {...register("study_materials", { required: true })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
            <label
              htmlFor="banner"
              className="block text-sm font-medium text-gray-600"
            >
              Course Banner:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              {...register("file", { required: true })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        <button
          type="submit"
        //   onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
        >
          Add Course
        </button>
      </form>



      <h1 className="text-2xl font-bold mb-4 mt-12">
        Admin Update & Delete Courses
      </h1>
      {isSubcategoryLoading ? (
        <p className="text-center text-xl">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Membership Type</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Banner</th>
                <th className="py-2 px-4 border-b">Update</th>
                <th className="py-2 px-4 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCourses?.map((course) => (
                <tr key={course._id}>
                  <td className="py-2 px-4 border-b">{course?.title}</td>
                  <td className="py-2 px-4 border-b">{course?.author}</td>
                  <td className="py-2 px-4 border-b">
                    {course?.membership_type}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {course?.category_id?.title}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Image
                      src={course.banner}
                      alt={`Banner for ${course.title}`}
                      width={400}
                      height={300}
                    />
                  </td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md">
                      Update
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b md:table-cell">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
