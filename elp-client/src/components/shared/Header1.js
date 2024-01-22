"use client";
import { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const Header1 = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const { data: courses } = useGetAllCoursesQuery();
  const coursesData = courses?.courses?.data;

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);
 
  return (
    <>
      <div className="flex justify-center">
      <span className="cursor-pointer flex items-center   lg:hover:text-bluePrimary sm:hover:text-white font-bold">
        ক্লাস রুটিন <IoIosArrowDown />
      </span>
      </div>
      {categoriesData && (
        <ul
          className={`absolute hidden min-w-[10em] px-4 text-white py-2 space-y-2 shadow-md group-hover:block text-left rounded-md transition-all duration-300 bg-bluePrimary`}
        >
          {categoriesData?.map((category) => (
            <li
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHoveredCategoryId(category.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}
            >
              <span className="cursor-pointer flex items-center">
                {category?.title}
                <IoIosArrowDown />
              </span>
              {hoveredCategoryId === category.id && subCategoriesData && (
                <ul
                  className={`absolute top-0 left-full space-y-2 text-white bg-bluePrimary py-2 shadow-md rounded-md`}
                >
                  {subCategoriesData
                    .filter(
                      (subCategory) =>
                        subCategory?.category_id?._id === category.id
                    )
                    .map((subCategory) => (
                      <li
                        key={subCategory?.id}
                        className="group relative"
                        onMouseEnter={() =>
                          setHoveredSubCategoryId(subCategory.id)
                        }
                        onMouseLeave={() => setHoveredSubCategoryId(null)}
                      >
                        <Link
                          href={`/courses/category/subcategory/${subCategory?._id}`}
                          className="block px-4 py-2"
                        >
                          {subCategory?.title}
                        </Link>
                        {hoveredSubCategoryId === subCategory.id &&
                          coursesData && (
                            <ul
                              className={`absolute top-0 left-full space-y-2  text-white bg-bluePrimary py-2 shadow-md rounded-md `}
                            >
                              {coursesData
                                .filter(
                                  (course) =>
                                    course?.sub_category_id?._id ===
                                    subCategory.id
                                )
                                .map((course) => (
                                  <li
                                    key={course?.id}
                                    className="group relative"
                                    onMouseEnter={() =>
                                      setHoveredCourseId(course.id)
                                    }
                                    onMouseLeave={() =>
                                      setHoveredCourseId(null)
                                    }
                                  >
                                    <button  className="cursor-pointer  px-10 ">
                                      {course?.title}
                                    </button>
                                    {hoveredCourseId === course.id && (
                                      <ul
                                        className={`absolute top-0 left-full  space-y-2 text-white bg-bluePrimary py-2 shadow-md rounded-md`}
                                      >
                                        <li>
                                        {/* <iframe src="https://drive.google.com/file/d/1_hqXWDM0tzBM2WX9Sg4_pn7W0yaCTVPk/preview" width="640" height="480" allow="autoplay"></iframe> */}
                                          <a
                                            href={course?.routine}
                                            className="block px-4 py-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            View Routine
                                          </a>

                                        </li>
                                      </ul>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          )}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

   
    </>
  );
};

export default Header1;
