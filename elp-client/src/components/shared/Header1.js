'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import { useGetAllCoursesQuery, useGetAllCoursesRoutineQuery } from '@/redux/api/courseApi';

const Header1 = () => {
  const { data: categories } = useGetAllCategoriesQuery();
  const categoriesData = categories?.categories;

  const { data: subCategories } = useGetAllSubcategoriesQuery();
  const subCategoriesData = subCategories?.subcategories;

  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const {data: courses} = useGetAllCoursesQuery();
  const coursesData = courses?.courses?.data;
 
  

  

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex">
        

          <li className="relative group">
            <span className="cursor-pointer text-white">Routines</span>
          
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header1;
