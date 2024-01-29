"use client"
import Commonbanner from "@/components/banners/Commonbanner";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";
import { useState } from "react";

const RoutinesPage = () => {
  const ITEMS_PER_PAGE = 10;
  const { data: courses, isLoading } = useGetAllCoursesQuery({ limit: 1000 });
  const coursesData = courses?.courses?.data;

  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique subcategories and categories
  const uniqueSubcategories = Array.from(
    new Set(
      coursesData
        ?.filter((course) => course.sub_category_id)
        .map((course) => course.sub_category_id.title)
    )
  );

  const uniqueCategories = Array.from(
    new Set(coursesData?.map((course) => course.sub_category_id?.category_id.title))
  );


  // Filter courses based on the selected subcategory and category
  const filteredCourses = coursesData?.filter(
    (course) =>
      (!selectedSubcategory || (course.sub_category_id && course.sub_category_id.title === selectedSubcategory)) &&
      (!selectedCategory || (course.sub_category_id && course.sub_category_id.category_id.title === selectedCategory))
  );



  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCourses?.length / ITEMS_PER_PAGE);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Extract the courses for the current page
  const currentCourses = filteredCourses?.slice(startIndex, endIndex);


  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'ক্লাস রুটিন' },
  ];


  return (
    <>
      <Commonbanner title="ক্লাস রুটিন" breadcrumbItems={breadcrumbItems} />

      {isLoading && (
        <div className="text-center text-gray-500 mt-4">
          Routines are loading...
        </div>
      )}

{
  !isLoading && <>
  {/* Add category filter */}
<div className="m-8">
        <label className="text-base font-bold">Filter by Category:</label>
        <select
          className="ml-2 p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>



       {/* Add subcategory filter */}
      <div className="m-8">
        <label className="text-sm font-bold">Filter by Subcategory:</label>
        <select
          className="ml-2 p-2 border border-gray-300 rounded"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">All</option>
          {uniqueSubcategories.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      </div>

      
  </>
}
      <div className="p-8 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {currentCourses?.map((course) => (  
          <div key={course.id} className="p-4 rounded-lg shadow bg-indigo-100">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {course.title}
            </h2>
           
            {course.sub_category_id && (
              <div className="mb-2">
                <h3 className="text-lg font-bold mb-1">
                  Category: {course.sub_category_id.category_id.title}
                </h3>
                <p className="text-sm mb-1">
                  Subcategory: {course.sub_category_id.title}
                </p>
              </div>
            )}
           
            {course.routine ? (
             <a
             href={course.routine}
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             <button className="bg-blue-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full">
               রুটিন দেখুন
             </button>
           </a>
            ) : (
              <p className="text-orange-600">রুটিন শীঘ্রই আসছে</p>
            )}
          </div>
        ))}


      </div>

       {/* Pagination controls */}
       <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-2 px-4 py-2 rounded-full ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

    </>
  );
};

export default RoutinesPage;
