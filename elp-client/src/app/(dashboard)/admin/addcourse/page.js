"use client";
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/api/courseApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import toast from "react-hot-toast";
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
  const { data: courses, isLoading: isSubcategoryLoading } =
    useGetAllCoursesQuery();
  const allCourses = courses?.courses?.data;
  const [addCourseMutation] = useAddCourseMutation();
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["image"],
    ["clean"],
  ];
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    subcategory_id: "",
    membership_type: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // const handleAddCourse = async (e) => {
  //     e.preventDefault();

  //     const selectedCategory = categories.categories.find(category => category.id === formData.category_id);
  //     const selectedSubcategory = subcategories.subcategories.find(subcategory => subcategory._id === formData.subcategory_id);

  //     const data = {
  //         _id: '65755aa98358bafe08784a01', // Assuming you want a static ID
  //         name: formData.name,
  //         membership_type: formData.membership_type,
  //         sub_category_id: {
  //             _id: selectedSubcategory._id,
  //             name: selectedSubcategory.name,
  //             category_id: {
  //                 _id: selectedCategory.id,
  //                 name: selectedCategory.name,
  //                 id: selectedCategory.id,
  //             },
  //             id: selectedSubcategory._id,
  //         },
  //         description: formData.description || 'Default description', // Use form data if available, otherwise use a default value
  //         id: '65755aa98358bafe08784a01', // Assuming you want a static ID
  //     };

  //     console.log(data);

  //     try {
  //         // await addCourseMutation.mutateAsync(formData);
  //     } catch (error) {
  //         console.error('Error adding course:', error);
  //     }
  // };
  const handleAddCourse = async (e) => {
    e.preventDefault();

    // const selectedCategory = categories.categories.find(category => category.id === formData.category_id);
    const selectedSubcategory = subcategories.subcategories.find(
      (subcategory) => subcategory._id === formData.subcategory_id
    );
    console.log(selectedSubcategory);

    const data = {
      name: formData.name,
      membership_type: formData.membership_type,
      sub_category_id: selectedSubcategory._id,
      description: formData.description || "Default description",
    };

    console.log(data);

    try {
      addCourseMutation(data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  if (isLoadingCategories || isLoadingSubcategories) {
    return <p>Loading...</p>;
  }

  if (isErrorCategories || isErrorSubcategories) {
    return <p>Error fetching data...</p>;
  }
  const handleDelete = async (categoryId) => {
    try {
      console.log(categoryId);
      await deleteSubCategory(categoryId);

      // toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <form onSubmit={handleAddCourse}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Course Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Category:
          </label>
          <select
            name="category_id"
            value={formData?.category_id}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories &&
              Array?.isArray(categories?.categories) &&
              categories?.categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Subcategory:
          </label>
          <select
            name="subcategory_id"
            value={formData?.subcategory_id}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories &&
              subcategories?.subcategories?.map((subcategory) => (
                <option key={subcategory?._id} value={subcategory?._id}>
                  {subcategory?.title}
                </option>
              ))}
          </select>
        </div>

        {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Membership Type:</label>
                    <input
                        type="text"
                        name="membership_type"
                        value={formData.membership_type}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Membership Type:
          </label>
          <select
            name="membership_type"
            value={formData?.membership_type}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="" disabled>
              Select membership type
            </option>
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
        </div>

        {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description:
          </label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            // onChange={handleInputChange}
            onChange={(value) =>
              setFormData((prevData) => ({ ...prevData, description: value }))
            }
            modules={{ toolbar: toolbarOptions }}
          />
        </div>
        <button
          type="button"
          onClick={handleAddCourse}
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
