'use client'
import { useAddCategoryMutation } from '@/redux/api/categoryApi';
import React, { useState } from 'react';

const AdminAddCategory = () => {
    const [addCategory] = useAddCategoryMutation();
    const [newCategory, setNewCategory] = useState({
        title: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await addCategory(newCategory);
            console.log('Mutation result:', result);
            console.log('New category added successfully');
        } catch (error) {
            console.error('Error adding new category', error);
        }
        // try {
        //     await addCategory(newCategory);
        //     console.log('New category added successfully');
        // } catch (error) {
        //     console.error('Error adding new category', error);
        // }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Add Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newCategory.title}
                        onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
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

