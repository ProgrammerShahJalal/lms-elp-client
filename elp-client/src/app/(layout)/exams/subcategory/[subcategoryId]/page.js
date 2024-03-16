"use client";

import { useGetSingleSubCategoryQuery } from "@/redux/api/subcategoryApi";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/router";

function SubCategoryExams({ params }) {
  const { subcategoryId } = params;

  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const {
    data: subCategory,
    isLoading,
    isError,
  } = useGetSingleSubCategoryQuery(subcategoryId);
  return (
    <div>
      <div className="flex justify-center">
        <h2 className="w-fit border-b-2 border-gray-300 pb-2 mt-16 font-bold text-3xl mb-6">
          {subCategory?.category_id?.title} - {subCategory?.title}
        </h2>
      </div>
      <p>working!</p>
    </div>
  );
}

export default SubCategoryExams;
