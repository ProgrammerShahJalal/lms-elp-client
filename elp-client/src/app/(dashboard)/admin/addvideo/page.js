'use client'
import { useAddPlaylistVideoMutation } from '@/redux/api/videoApi';
import React, { useState } from 'react';

const AddVideo = () => {
    const initialFormData = {
        name: '',
        course_id: '',
        playlist_link: '',
    };
    const [addPlaylistVideo] = useAddPlaylistVideoMutation();
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            addPlaylistVideo(formData)
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };
    return (
        <div className="container mx-auto my-8 lg:space-x-48">
            <h2 className="text-2xl font-bold mb-4">Form</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Course</label>
                    <input
                        type="text"
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Playlist Link:</label>
                    <input
                        type="text"
                        name="playlist_link"
                        value={formData.playlist_link}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
                >
                    Submit
                </button>
            </form>

            {/* Display the submitted data */}
            {/* {submittedData && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Submitted Data</h2>
                    <pre className="bg-gray-100 p-4 mt-2 rounded">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )} */}

            {/* Display the current data array */}
            {/* <div className="mt-8">
                <h2 className="text-2xl font-bold">Current Data</h2>
                <pre className="bg-gray-100 p-4 mt-2 rounded">{JSON.stringify(data, null, 2)}</pre>
            </div> */}
        </div>
    );
};

export default AddVideo;