"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useGetSingleCoursePlaylistQuery,
  useUpdateCoursePlaylistMutation,
} from "@/redux/api/videoApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateCoursePlaylistEditPage = ({ params }) => {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [playListLink, setPlayListLink] = useState("");

  const { data: singleCoursePLaylist } = useGetSingleCoursePlaylistQuery(id);
  const [updateCoursePlaylist] = useUpdateCoursePlaylistMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: subCategories, refetch: refetchSubCategories } =
    useGetAllSubcategoriesQuery({
      category_id: selectedCategory,
    });
  const { data: courses, refetch: refetchCourses } = useGetAllCoursesQuery({
    sub_category_id: selectedSubcategory,
  });
  const allCourse = courses?.courses?.data;

  useEffect(() => {
    setTitle(singleCoursePLaylist?.title);
    setPlayListLink(singleCoursePLaylist?.playlist_link) ;
 
  }, [singleCoursePLaylist]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      //   const res = await updateCoursePlaylist({
      //     id,
      //    title,

      //   });
      //    console.log(res, 'afetr api')
      //   if (res) {
      //     toast.success("Profile updated successfully");
      //     // router.push("/profile");
      //   } else {
      //     toast.error("Something is wrong to update user");
      //   }
    } catch (err) {
      //   toast.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>


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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Playlist Link:
          </label>
          <input
            type="text"
            required
            name="playlist_link"
            value={playListLink}
            onChange={(e) =>
                setPlayListLink( e.target.value)
            }
            className="mt-1 p-2 w-96  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* ... (Other form fields) */}

        <input
          type="submit"
          value="Update Course Playlist"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
        />
      </form>
    </div>
  );
};

export default UpdateCoursePlaylistEditPage;
