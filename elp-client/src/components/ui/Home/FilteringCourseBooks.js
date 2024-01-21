'use client'

import {  useGetSingleSubCategoryQuery } from "@/redux/api/subcategoryApi";
import { useState } from "react";
import SubCategoryCourses from "./course/SubCategoryCourses";
import SubCategoryBooks from "./SubCategoryBooks";

const FilteringCourseBooks = ({sub_category_id}) => {
    const [showCourses, setShowCourses] = useState(true);



    const {data:subCategory} = useGetSingleSubCategoryQuery(sub_category_id);
    // console.log(data)
    return (
        <>
        <div className="flex gap-5 py-10 mx-14 items-center">
        <h2 className="text-2xl font-bold px-2  rounded">{subCategory?.category_id?.title}  {subCategory?.title} </h2>
        {/* <button  onClick={()=>setShowCourses(true)} className="mb-5 text-bluePrimary hover:text-yellowPrimary w-44  px-7 py-3 rounded transition-all duration-500 delay-200 font-bold text-xl">
          সব  কোর্স দেখুন
        </button> */}
        <button  onClick={()=>setShowCourses(true)} className="mb-5 text-bluePrimary hover:text-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold text-xl mt-4">
          সব  কোর্স দেখুন
        </button>
        <button onClick={()=>setShowCourses(false)} className="mb-5 mt-4 text-bluePrimary hover:text-yellowPrimary    rounded transition-all duration-500 delay-200 font-bold text-xl">
          সব বই দেখুন
        </button>
      </div>
      {showCourses ? <SubCategoryCourses sub_category_id={sub_category_id}/> : <SubCategoryBooks sub_category_id={sub_category_id}/>}
      </>
    );
};

export default FilteringCourseBooks;