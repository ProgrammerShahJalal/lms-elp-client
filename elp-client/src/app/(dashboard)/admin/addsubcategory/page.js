'use client'
import { useGetAllCategoriesQuery } from '@/redux/api/categoryApi';
import { useAddSubcategoryMutation } from '@/redux/api/subcategoryApi';
import React, { useState } from 'react';
const AdminAddSubCategory = () => {
    const [addSubcategory] = useAddSubcategoryMutation()
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAllCategoriesQuery();
    const [newSubCategory, setNewSubCategory] = useState({
        name: '',
        category: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedCategory = categories?.categories?.find(category => category.name === newSubCategory.category);
        if (!selectedCategory) {
            console.error('Selected category not found');
            return;
        }
        const data = {
            name: newSubCategory.name,
            category_id: selectedCategory.id
            // category_id: {
            //     _id: selectedCategory.id,
            //     name: selectedCategory.name,
            //     id: selectedCategory.id,
            // },
        };
        try {
            const result = await addSubcategory(data);
            console.log('Mutation result:', result);
            console.log('New Subcategory added successfully');
        } catch (error) {
            console.error('Error adding new subcategory', error);
        }
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Add Subcategory</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Subcategory Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newSubCategory.name}
                        onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select
                        name="category"
                        value={newSubCategory.category}
                        onChange={(e) => setNewSubCategory({ ...newSubCategory, category: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories?.categories?.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
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