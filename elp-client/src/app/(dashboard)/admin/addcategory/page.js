'use client'
import { useAddCategoryMutation } from '@/redux/api/categoryApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdminAddCategory = () => {

  const [addCategory] = useAddCategoryMutation()
 
 const router = useRouter();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit =  async(data) => {

    // console.log(data)

    const content = {...data};
    const file = content['file']
    // console.log(file)
    delete content['file'];
    const result = JSON.stringify(content)
    // console.log(result)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', result);
    console.log(formData, 'formdaata')

    try {
      const resultData = await addCategory(formData)
      if(resultData){
          toast.success("category created successfully");
          router.push("/")
      }
      // console.log(resultData, ' from add category async')
      
    } catch (error) {
      toast.error(error.message)
      
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
        </div>
    );
};

export default AdminAddCategory;




