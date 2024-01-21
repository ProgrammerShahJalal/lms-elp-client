

"use client"
import { useState } from 'react';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery } from '@/redux/api/courseApi';

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
      
           <div className="flex justify-center py-2">
           <span className="cursor-pointer flex items-center   hover:text-bluePrimary font-bold">
            ক্লাস রুটিন <IoIosArrowDown />
            </span>
           </div>
            {categoriesData && (
              <ul
                className={`absolute hidden px-4 text-white bg-bluePrimary py-2 space-y-2 shadow-md group-hover:block text-left`}
              >
                {categoriesData?.map((category) => (
                  <li
                    key={category.id}
                    className="group"
                    onMouseEnter={() => setHoveredCategoryId(category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                  >
                    <span className="cursor-pointer flex items-center">
                      {category?.title}
                      <IoIosArrowDown />
                    </span>
                    {hoveredCategoryId === category.id && subCategoriesData && (
                      <ul className={`absolute top-0 left-20 space-y-2 text-white bg-bluePrimary py-2 shadow-md`}>
                        {subCategoriesData
                          .filter((subCategory) => subCategory?.category_id?._id === category.id)
                          .map((subCategory) => (
                            <li
                              key={subCategory?.id}
                              className="group"
                              onMouseEnter={() => setHoveredSubCategoryId(subCategory.id)}
                              onMouseLeave={() => setHoveredSubCategoryId(null)}
                            >
                              <Link href={`/courses/category/subcategory/${subCategory?._id}`} className="block px-5">
                                {subCategory?.title}
                              </Link>
                              {hoveredSubCategoryId === subCategory.id && coursesData && (
                                <ul className={`absolute top-0 left-20 space-y-2 text-white bg-bluePrimary py-2 shadow-md`}>
                                  {coursesData
                                    .filter((course) => course?.sub_category_id?._id === subCategory.id)
                                    .map((course) => (
                                      <li
                                        key={course?.id}
                                        className="group"
                                        onMouseEnter={() => setHoveredCourseId(course.id)}
                                        onMouseLeave={() => setHoveredCourseId(null)}
                                      >
                                        <span className="cursor-pointer flex items-center">
                                          {course?.title}
                                          <IoIosArrowDown />
                                        </span>
                                        {hoveredCourseId === course.id && (
                                          <ul className={`absolute top-0 left-20 space-y-2 text-white bg-bluePrimary py-2 shadow-md`}>
                                            <li>
                                              <a href={course?.routine} className="block px-5" target="_blank" rel="noopener noreferrer">
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
