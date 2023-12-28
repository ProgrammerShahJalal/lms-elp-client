
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import Image from "next/image"
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const UserCourses = () => {
  const { data } = useGetAllQuestionsQuery();
  // const allQuiz = data?.categories?.data;

  console.log(data);
  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/course-playlists');
        const data = await response.json();
        setVideoData(data.data);
        setCurrentVideoIndex(0);
      } catch (error) {
        setError('Error fetching video data');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();

  }, []);
  const showPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  };

  const showNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
  };

  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
  };




  // from here i show quiz question to the student





  return (
    <div className="rounded-lg py-5 border border-gray-200">
      <div className="card card-compact w-72 bg-base-100 shadow-xl ml-10">
        <figure><Image src="https://i.ibb.co/G9hnB13/course-1.webp" alt="course" width={300} height={100} /></figure>
        <div className="card-body">
          <h2 className="card-title"> Learning Course</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"> 60 days left</button>
          </div>
        </div>
      </div>
      {/* this is video playlist */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {videoData.length > 0 && (
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">Video List</h1>

                <div className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{videoData[currentVideoIndex].title}</h2>
                  <div id="youtube-player">
                    <ReactPlayer width={500} controls key={videoData[currentVideoIndex].playlist_link} volume url={videoData[currentVideoIndex].playlist_link}
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
                      disabled={currentVideoIndex === videoData.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>










              </div>
              <div>
                <h2 className="text-2xl font-bold  mb-4 text-blue-500">All Video Names</h2>
                <ol className="pl-4 border-t border-b border-blue-300">
                  {videoData.map((video, index) => (
                    <li
                      key={video._id}
                      className={`cursor-pointer py-2 px-2 border-b border-blue-300 ${currentVideoIndex === index ? 'bg-blue-300' : ''
                        } text-xl`}
                      onClick={() => selectVideo(index)}
                    >
                      {index + 1}. {video.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* from here i show quiz question to the student */}

      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>



    </div>
  )
}

export default UserCourses;