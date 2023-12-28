'use client'
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery } from '@/redux/api/categoryApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdminAddCategory = () => {
    const { data: categories } = useGetAllCategoriesQuery();
    const allCategory = categories?.categories
    const [addCategory] = useAddCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const router = useRouter();

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {

        // console.log(data)

        const content = { ...data };
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
            const resultData = await addCategory(formData)
            console.log(resultData, "after api call")
            if (resultData) {
                toast.success("category created successfully");
                router.push("/")
            }
            // console.log(resultData, ' from add category async')

        } catch (error) {
            toast.error(error.message)

        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            // toast.success("Category deleted successfully");
        } catch (error) {
            toast.error("Failed to delete category");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Add Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category Name</label>
                    <input
                        type="text"
                        name="title"
                        {...register("title", { required: true })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category Icon</label>
                    <input
                        type="file"
                        name="file"
                        {...register("file", { required: true })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Add Category
                </button>
            </form>

            <div>
                <h1 className="text-2xl font-bold mb-4 mt-12">Admin Delete Category List</h1>
                {allCategory ? (
                    <ul>
                        {allCategory?.map((category, i) => (
                            <li key={category.id} className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{i + 1}) {category.title}</h2>
                                    {category.icon && (
                                        <img
                                            src={category.icon}
                                            alt={`Icon for ${category.title}`}
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                    )}
                                </div>
                                <div>
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No categories found</p>
                )}
            </div>
        </div>
    );
};

export default AdminAddCategory;




