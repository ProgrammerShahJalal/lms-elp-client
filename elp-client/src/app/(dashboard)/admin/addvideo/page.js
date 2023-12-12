'use client'
import React, { useState } from 'react';

const AddVideo = () => {
    const initialFormData = {
        name: '',
        course_id: '',
        playlist_link: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [data, setData] = useState([
        {
            _id: "65756ca57875e03b786ab40e",
            name: "Basic",
            course_id: "65755aa98358bafe08784a01",
            playlist_link: "https://www.youtube.com/playlist?list=PLHiZ4m8vCp9Nflbo9a0pZuLscG_Xc7DKq",
            createdAt: "2023-12-10T07:45:41.364Z",
            updatedAt: "2023-12-10T07:45:41.364Z",
            __v: 0
        }
    ]);
    const [submittedData, setSubmittedData] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            // Assuming your API endpoint is http://localhost:5000/api/v1/course-playlists
            const response = await fetch('http://localhost:5000/api/v1/course-playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('POST request successful:', responseData);

                // Update the data state with the new data
                setData((prevData) => [...prevData, responseData.data.data]);

                // Update the submittedData state with the response data
                setSubmittedData(responseData.data.data);
            } else {
                console.error('POST request failed');
            }
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
                    <label className="block text-sm font-medium text-gray-600">Course ID:</label>
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