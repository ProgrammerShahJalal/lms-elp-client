import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useGetAllCourseSubscriptionsHistoryQuery } from "@/redux/api/courseApi";
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import {
  useGetAllPlaylistQuery,
  useGetSingleCoursePlaylistQuery,
} from "@/redux/api/videoApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const UserCourses = () => {
  const { data, isLoading, isError } =
    useGetAllCourseSubscriptionsHistoryQuery();
  console.log(data?.courseSubscription, "from usercourses fggfh");
  const courseSubs = data?.courseSubscription;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && courseSubs?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && courseSubs?.length > 0) {
    content = courseSubs?.map((item) => (
      <div key={item?._id} className=" ">
        <div className="bg-transparent rounded shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 bo">
          <div className="text-center flex justify-center items-center">
            <div className="pt-4">
              <Image
                src={item?.course_id?.banner}
                alt="img"
                width={50}
                height={20}
              />
              <h2 className="py-5 font-semibold ">{item?.course_id?.title} </h2>
              <h2 className="py-5 font-semibold ">{item?.expire_date} </h2>
            </div>
            {/* <h2 className="py-5 font-semibold ">{item?.icon} </h2> */}
          </div>
        </div>
      </div>
    ));
  }

  // const allQuiz = data?.categories?.data;
  // const {id} = params;
  // console.log(id, 'from params')

  // const {data:coursePlaylists} = useGetSingleCoursePlaylistQuery({id: params?.id});
  // console.log(coursePlaylists, 'from api single coures playlist data')

  // console.log(data);
  // const [videoData, setVideoData] = useState([]);

  // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {

  //   const fetchVideoData = async () => {
  //     try {
  //       const response = await fetch('https://easy-learning-platform.vercel.app/api/v1/course-playlists');
  //       const data = await response.json();
  //       setVideoData(data?.data);
  //       setCurrentVideoIndex(0);
  //     } catch (error) {
  //       setError('Error fetching video data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVideoData();

  // }, []);

  // console.log(videoData,'video data')
  // const showPreviousVideo = () => {
  //   setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoData.length - 1 : prevIndex - 1));
  // };

  // const showNextVideo = () => {
  //   setCurrentVideoIndex((prevIndex) => (prevIndex === videoData.length - 1 ? 0 : prevIndex + 1));
  // };

  // const selectVideo = (index) => {
  //   setCurrentVideoIndex(index);
  // };

  // from here i show quiz question to the student

  return (
    <div className="rounded-lg py-5 border border-gray-200">
      <div className="grid lg:grid-cols-2 gap-4">{content}</div>

      {/* this is video playlist */}
      {/* <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {videoData?.length > 0 && (
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">Video List</h1>

                <div className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{videoData[currentVideoIndex]?.title}</h2>
                  <div id="youtube-player">
                    <ReactPlayer width={500} controls key={videoData[currentVideoIndex]?.playlist_link} volume url={videoData[currentVideoIndex].playlist_link}
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
                      {index + 1}. {video?.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div> */}
      {/* from here i show quiz question to the student */}


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
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
    </div>
  );
};

export default UserCourses;
