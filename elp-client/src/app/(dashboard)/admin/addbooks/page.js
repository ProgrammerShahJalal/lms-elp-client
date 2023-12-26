"use client";
import React, { useState } from "react";
import { useAddBooksMutation } from "@/redux/api/booksApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useRouter } from "next/navigation";


const AddBooks = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addBooks] = useAddBooksMutation();
  const router = useRouter();

const {data: courses, isLoading, isError} = useGetAllCoursesQuery();
const courseData = courses?.courses?.data;


  const onSubmit = async (data) => {
    
    data.price = Number(data?.price)
    data.discount_price = Number(data?.discount_price)
    console.log(typeof(data.price));
    const content = {...data};
    const file = content['file']
    // console.log(file)
    // delete content['file'];
    const result = JSON.stringify(content)
    console.log(result, "json")
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('data', result);
    // console.log(formData?.price, 'formdaata')
    console.log(data, 'after formdata')
     try {
       const resultData = await addBooks(formData);
       console.log(resultData, 'after ap call')
      //  if (resultData) {
      //    toast.success("subcategory created successfully");
      //    router.push("/");
      //  }
       console.log(resultData, ' from add category async')
     } catch (error) {
       toast.error(error.message);
     }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Add Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="writer"
            className="block text-sm font-medium text-gray-600"
          >
            Writer:
          </label>
          <input
            type="text"
            id="writer"
            name="writer"
            {...register("writer", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            {...register("price", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="discount_price"
            className="block text-sm font-medium text-gray-600"
          >
            Discount Price:
          </label>
          <input
            type="number"
            id="discount_price"
            name="discount_price"
            {...register("discount_price", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            {...register("description", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="format"
            className="block text-sm font-medium text-gray-600"
          >
            Format:
          </label>
          <select
            id="format"
            name="format"
            {...register("format", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="pdf">PDF</option>
            <option value="hard copy">Hard Copy</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="course_id"
            className="block text-sm font-medium text-gray-600"
          >
            Format:
          </label>
          <select
            id="course_id"
            name="course_id"
            {...register("course_id", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="" disabled>
              Select a course
            </option>
            {courseData?.map((course) => (
              <option key={course?.id} value={course?._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="cover_page"
            className="block text-sm font-medium text-gray-600"
          >
            Cover page Photo:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            {...register("file", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="pdf_link"
            className="block text-sm font-medium text-gray-600"
          >
            PDF Link:
          </label>
          <input
            type="text"
            id="pdf_link"
            name="pdf_link"
            {...register("pdf_link", { required: true })}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
