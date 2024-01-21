'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesRoutineQuery } from '@/redux/api/courseApi';

const Header1 = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
 
  const { data: routines } = useGetAllCoursesRoutineQuery();


  const allRoutines = routines?.routines;

  useEffect(() => {
    let timeoutId;

    if (hoveredCategoryId !== null) {
      timeoutId = setTimeout(() => {
        setShowSubcategories(true);
      }, 200); // Adjust the delay time (in milliseconds) as needed
    } else {
      setShowSubcategories(false);
    }

    return () => clearTimeout(timeoutId);
  }, [hoveredCategoryId]);

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex">
          <li className="relative group">
            <span className="cursor-pointer text-white">Courses</span>
            {categoriesData && (
              <ul
                className={`absolute hidden bg-white py-2 space-y-2 shadow-md group-hover:block ${
                  showSubcategories ? 'block' : ''
                }`}
                onMouseEnter={() => setShowSubcategories(true)}
                onMouseLeave={() => {
                  setHoveredCategoryId(null);
                  setShowSubcategories(false);
                }}
              >
                {categoriesData?.map((category) => (
                  <li
                    key={category.id}
                    className="group"
                    onMouseEnter={() => setHoveredCategoryId(category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                  >
                    <span className="cursor-pointer">{category?.title}</span>
                    {hoveredCategoryId === category.id && subCategoriesData && (
                      <ul className="absolute top-full left-0 bg-red-500 py-2 space-y-2 shadow-md">
                        {subCategoriesData
                          .filter((subCategory) => subCategory?.category_id?._id === category.id)
                          .map((subCategory) => (
                            <li key={subCategory?.id}>
                              <Link href={`/subcategory/${subCategory?.id}`} className="cursor-pointer">
                                {subCategory?.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative group">
            <span className="cursor-pointer text-white">Routines</span>
            {allRoutines && (
              <ul
                className={`absolute hidden bg-white py-2 space-y-2 shadow-md group-hover:block ${
                  showCategories ? 'block' : ''
                }`}
                onMouseEnter={() => {
                  setShowCategories(true);
                  setShowSubcategories(false);
                }}
                onMouseLeave={() => {
                  setShowCategories(false);
                }}
              >
                {categoriesData?.map((category) => (
                  <li key={category.id}>
                    <Link href={`/category/${category.id}`} className="cursor-pointer">
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header1;
