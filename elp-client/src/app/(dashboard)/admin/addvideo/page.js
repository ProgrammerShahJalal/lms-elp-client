'use client'
import { useGetAllQuestionsQuery } from '@/redux/api/questionsApi';
import { useAddPlaylistVideoMutation, useGetAllPlaylistQuery } from '@/redux/api/videoApi';
import React, { useState } from 'react';

const AddVideo = () => {
    const { data } = useGetAllPlaylistQuery()
    const course = data?.courses;

    const { data:allVedio } = useGetAllQuestionsQuery();
    // const allQuiz = data?.categories?.data;
    // console.log(allVedio, 'from api')
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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Playlist Title</th>
                            <th className="py-2 px-4 border-b">Course Title</th>
                            <th className="py-2 px-4 border-b">Playlist Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course?.map((playlist) => (
                            <tr key={playlist._id}>
                                <td className="py-2 px-4 border-b">{playlist?.title}</td>
                                <td className="py-2 px-4 border-b">{playlist?.course_id?.title}</td>
                                <td className="py-2 px-4 border-b">
                                    <a
                                        href={playlist?.playlist_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {playlist.playlist_link}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddVideo;