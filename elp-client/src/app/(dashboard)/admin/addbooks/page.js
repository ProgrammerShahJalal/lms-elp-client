"use client";
import React, { useState } from "react";
import {
  useAddBooksMutation,
  useDeleteBooksMutation,
  useGetAllBooksQuery,
} from "@/redux/api/booksApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import Swal from "sweetalert2";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const AddBooks = () => {
  const { data: allBooks, isLoading: isBooksLoading } = useGetAllBooksQuery();
  const allBook = allBooks?.books?.data;
  const [deleteBooks] = useDeleteBooksMutation();
  const [addBooks] = useAddBooksMutation();
  // const { data: courses, isLoading, isError } = useGetAllCoursesQuery();
  // const courseData = courses?.courses?.data;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery();

  const {
    data: subcategories,
    isLoading: isLoadingSubcategories,
    isError: isErrorSubcategories,
  } = useGetAllSubcategoriesQuery({
    category_id: selectedCategory,
  });
  const allSubcategory = subcategories?.subcategories;
  const { data} = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
  });
  const allCourse = data?.courses?.data;

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    data.price = Number(data?.price);
    data.discount_price = Number(data?.discount_price);

    const content = { ...data };

    const file = content["file"];
    // console.log(file)
    // delete content['file'];
    const result = JSON.stringify(content);
    console.log(result, "json")
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("data", result);
    // console.log(formData, 'formdaata')
    try {
      const resultData = await addBooks(formData);
        console.log(resultData, "after ap call");
      if (resultData) {
        toast.success("Book created successfully");
      }
      // console.log(resultData, ' from add category async')
    } catch (error) {
      toast.error(error.message);
    }
  };

  // book delete function
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteBooks(id);
        // console.log(res?.data)

        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="container mx-auto mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-6">Add Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Book Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              {...register("title", { required: true })}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="writer"
              className="block text-sm font-medium text-gray-600"
            >
              Book Author:
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
    <option value="hard copy">Hard Copy</option>
    <option value="pdf">PDF</option>
  </select>
</div>

{/* Conditionally render PDF Link input based on the selected format */}
{watch("format") === "pdf" && (
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
)}

          {/* <div>
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
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Category</label>

            <select
              {...register("category_id")}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("sub_category_id", "");
              }}
              value={selectedCategory}
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
              {...register("sub_category_id")} disabled={!selectedCategory}
              onChange={(e) => {
                setSelectedSubcategory(e.target.value);
                setValue("course_id", ""); // Reset the selected course when the subcategory changes
              }}
              value={selectedSubcategory}
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
          <div className="">
            <label className="block text-sm font-bold mb-2">Course</label>
            <select disabled={!selectedSubcategory}
              {...register("course_id")}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              
              {allCourse?.length === 0 ? (
                <option value="" disabled>
                  No courses available
                </option>
              ) : (
                allCourse?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course?.title}
                  </option>
                ))
              )}
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

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Book
          </button>
        </form>

        <h1 className="text-2xl font-bold mb-4 mt-12">
          Admin Update & Delete Books
        </h1>
        {isBooksLoading ? (
          <p className="text-center text-xl">Loading books...</p>
        ) : (
          <div className="overflow-x-auto mt-10">
            <table className=" min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Writer</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Discount Price</th>
                  <th className="py-2 px-4 border-b">Cover Page</th>
                  <th className="py-2 px-4 border-b">Format</th>
                  <th className="py-2 px-4 border-b">PDF Link</th>
                  <th className="py-2 px-4 border-b">Update</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {allBook?.map((book, i) => (
                  <tr key={book._id}>
                    <td className="py-2 px-4 border-b">
                      {i + 1}) {book?.title}
                    </td>
                    <td className="py-2 px-4 border-b">{book?.writer}</td>
                    <td className="py-2 px-4 border-b">{book?.price}</td>
                    <td className="py-2 px-4 border-b">
                      {book?.discount_price}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={book.cover_page}
                        alt={`Cover for ${book.title}`}
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{book.format}</td>
                    <td className="py-2 px-4 border-b">
                      {book.format === "pdf" ? (
                        <a
                          href={book.pdf_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      ) : (
                        "Not Applicable"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b md:table-cell">
                      <button className="bg-blue-500 text-white py-1 px-2 rounded-md">
                        Update
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b md:table-cell">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                        onClick={() => handleDelete(book?.id)}
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
    </>
  );
};

export default AddBooks;
