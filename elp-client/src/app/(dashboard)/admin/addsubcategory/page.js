"use client";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useAddSubcategoryMutation } from "@/redux/api/subcategoryApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const AdminAddSubCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [addSubcategory] = useAddSubcategoryMutation();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery();

  const onSubmit = async (data) => {
    console.log(data);
    const content = {...data};
    const file = content['file']
    // console.log(file)
    // delete content['file'];
    const result = JSON.stringify(content)
    console.log(result, "json")
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('data', result);
    console.log(formData, 'formdaata')
    try {
      const resultData = await addSubcategory(formData);
      console.log(resultData, 'after ap call')
      // if (resultData) {
      //   toast.success("subcategory created successfully");
      //   router.push("/");
      // }
      // console.log(resultData, ' from add category async')
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Add Subcategory</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Subcategory Title
          </label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Subcategory Icon
          </label>
          <input
            type="file"
            name="file"
            {...register("file", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select
            {...register("category_id", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.categories?.map((category) => (
              <option key={category?.id} value={category?._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Subcategory
        </button>
      </form>
    </div>
  );
};

export default AdminAddSubCategory;
