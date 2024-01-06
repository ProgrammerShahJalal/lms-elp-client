"use client";
import { useGetMyCourseVedioPlaylistQuery } from "@/redux/api/videoApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const CourseVedioPlaylistPage = () => {
  const params = useParams();
  const id = params?.id;
  // console.log(params.id,'from details page');

  const { data:course } = useGetMyCourseVedioPlaylistQuery(id);
  // console.log(course, "data vedio");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const showPreviousVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? course.length - 1 : prevIndex - 1));
    };

    const showNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex === course.length - 1 ? 0 : prevIndex + 1));
    };



    const selectVideo = (index) => {
        setCurrentVideoIndex(index);
    };


 
  return (
    <div>
      

      <div>
        {course?.length > 0 && (
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">Video List</h1>

                <div className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold mb-2">
                    {course[currentVideoIndex]?.title}
                  </h2>
                  <div id="youtube-player">
                    <ReactPlayer
                      width={500}
                      controls
                      key={course[currentVideoIndex]?.playlist_link}
                      volume
                      url={course[currentVideoIndex].playlist_link}
                    />
                  </div>

                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={showPreviousVideo}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                      disabled={currentVideoIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={showNextVideo}
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                      disabled={currentVideoIndex === course.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold  mb-4 text-blue-500">
                  All Video Names
                </h2>
                <ol className="pl-4 border-t border-b border-blue-300">
                  {course?.map((video, index) => (
                    <li
                      key={video._id}
                      className={`cursor-pointer py-2 px-6 rounded-md border-b border-blue-300 ${
                        currentVideoIndex === index ? "bg-blue-300" : ""
                      } text-xl`}
                      onClick={() => selectVideo(index)}
                    >
                      {index + 1}. {video?.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseVedioPlaylistPage;
