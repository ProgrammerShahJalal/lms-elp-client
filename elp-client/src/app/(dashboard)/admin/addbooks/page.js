'use client'
import React, { useState } from 'react';
import { useAddBooksMutation } from '@/redux/api/booksApi';
import toast from 'react-hot-toast';

const AddBooks = () => {
    const [bookData, setBookData] = useState({
        name: '',
        writer: '',
        price: 0,
        description: '',
        format: '',
        pdf_link: '',
    });
    const [addBooks] = useAddBooksMutation();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: name === 'price' ? parseInt(value, 10) : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            addBooks(bookData);
            toast.success('Book added successfully!');
            setBookData({
                name: '',
                writer: '',
                price: 0,
                description: '',
                format: '',
                pdf_link: '',
            });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6">Add Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="writer" className="block text-sm font-medium text-gray-600">
                        Writer:
                    </label>
                    <input
                        type="text"
                        id="writer"
                        name="writer"
                        value={bookData.writer}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={bookData.price}
                        step="1"
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="format" className="block text-sm font-medium text-gray-600">
                        Format:
                    </label>
                    <select
                        id="format"
                        name="format"
                        value={bookData.format}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="pdf">PDF</option>
                        <option value="hard copy">Hard Copy</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pdf_link" className="block text-sm font-medium text-gray-600">
                        PDF Link:
                    </label>
                    <input
                        type="text"
                        id="pdf_link"
                        name="pdf_link"
                        value={bookData.pdf_link}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBooks;
