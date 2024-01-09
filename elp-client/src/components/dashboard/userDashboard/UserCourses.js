import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetMyCourseSubscriptionsHistoryQuery } from "@/redux/api/courseApi";

import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";
import {
  useGetAllPlaylistQuery,
  useGetSingleCoursePlaylistQuery,
} from "@/redux/api/videoApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
///subscription-histories//my-subscription-histories
// /courses-playlists/course/:course_id
const UserCourses = () => {
  const { data, isLoading, isError } =
    useGetMyCourseSubscriptionsHistoryQuery()
 
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
      <div key={item?._id} className="card card-compact w-72  shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer">
      <figure><Image src={item?.course_id?.banner} alt="course" width={300} height={100} /></figure>
      <div className="card-body">
        <h2 className="card-title"> {item?.course_id?.title}</h2>
        <p><progress className="progress progress-primary w-56" value="10" max="100"> </progress> 0%</p>
       
        <Timer expireDate={item?.expire_date}/>
        
        <hr></hr>
        <div className="card-actions justify-center">
          <Link href={`/user/mycourses/details/${item?.course_id?._id}`} className="text-lg text-yellowPrimary cursor-pointer"> কোর্সটি শুরু করুন</Link>
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
    <div className="">
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
      {/* <Link href={`/user/mycourses/details/${item?.course_id?._id}`}>
              continue
              </Link> */}

     
      <h6 className="text-2xl font-bold my-20">Quiz Questions</h6>
    </div>
  );
};

export default UserCourses;
