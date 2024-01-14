'use client'
import { useGetAllCoursesQuery } from '@/redux/api/courseApi';
import { useGetAllQuestionsQuery } from '@/redux/api/questionsApi';
import { useAddPlaylistVideoMutation, useDeleteVideoPlaylistMutation, useGetAllPlaylistQuery } from '@/redux/api/videoApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AddVideo = () => {
    const [addPlaylistVideo] = useAddPlaylistVideoMutation();
    const { data } = useGetAllPlaylistQuery();
    const course = data?.courses;
    const [deleteVideoPlaylist] = useDeleteVideoPlaylistMutation()

    const { data: allVedio } = useGetAllQuestionsQuery();
    const { data: allCourse } = useGetAllCoursesQuery();
    const courses = allCourse?.courses?.data;
    // const allQuiz = data?.categories?.data;
    // console.log(allVedio, 'from api')
    const initialFormData = {
        name: '',
        course_id: '',
        playlist_link: '',
    };
   
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const res= addPlaylistVideo(formData);
            if(res){
                toast.success("video playlist added successfully")
            }
        } catch (error) {
            toast.error('Error during POST request:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });
    
          if (result.isConfirmed) {
            // User confirmed deletion
            const res = await deleteVideoPlaylist(id);
            // console.log(res?.data)
    
            if (res?.data?._id === id) {
              // Item deleted successfully
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              // Something went wrong with deletion
              Swal.fire({
                title: "Error!",
                text: "Something went wrong with deletion.",
                icon: "error",
              });
            }
          }
        } catch (err) {
          // Handle any errors that occur during the process
          toast.error(err.message);
        }
      };

    return (
        <div className=" my-8 ">
         
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Name:</label>
                    <input required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Course</label>
                    <select required
                        name="course_id"
                        // value={formData.course_id}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a course</option>
                        {courses &&
                            courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Playlist Link:</label>
                    <input
                        type="text" required
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
            <div className=" overflow-x-auto mt-10  ">
                <table className="min-w-full  bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Playlist Title</th>
                            <th className="py-2 px-4 border-b">Course Title</th>
                            <th className="py-2 px-4 border-b">Playlist Link</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {course?.map((playlist) => (
                            <tr key={playlist._id} className=''>
                                <td className="py-2 px-4 border-b">{playlist?.title}</td>
                                <td className="py-2 px-4 border-b">{playlist?.course_id?.title}</td>
                                <td className="py-2 pl-2 border-b">
                                    <a
                                        href={playlist?.playlist_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {playlist.playlist_link}
                                    </a>
                                </td>
                                <td><button
                    className="bg-red-500 text-white py-1 px-2 rounded-md"
                    onClick={() => handleDelete(playlist?.id)}
                  >
                    Delete
                  </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddVideo;
