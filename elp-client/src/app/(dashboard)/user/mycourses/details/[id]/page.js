// "use client";
// import { useGetMyCourseVedioPlaylistQuery } from "@/redux/api/videoApi";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";

// const CourseVedioPlaylistPage = () => {
//   const params = useParams();
//   const id = params?.id;
//   // console.log(params.id,'from details page');

//   const { data:course } = useGetMyCourseVedioPlaylistQuery(id);
//   // console.log(course, "data vedio");
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//     const showPreviousVideo = () => {
//         setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? course.length - 1 : prevIndex - 1));
//     };

//     const showNextVideo = () => {
//         setCurrentVideoIndex((prevIndex) => (prevIndex === course.length - 1 ? 0 : prevIndex + 1));
//     };



//     const selectVideo = (index) => {
//         setCurrentVideoIndex(index);
//     };


 
//   return (
//     <div>
      

//       <div>
//         {course?.length > 0 && (
//           <div className="container mx-auto my-8">
//             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold mb-4">Video List</h1>

//                 <div className="bg-white p-4 rounded-md shadow-md">
//                   <h2 className="text-lg font-semibold mb-2">
//                     {course[currentVideoIndex]?.title}
//                   </h2>
//                   <div id="youtube-player">
//                     <ReactPlayer
//                       width={500}
//                       controls
//                       key={course[currentVideoIndex]?.playlist_link}
//                       volume
//                       url={course[currentVideoIndex].playlist_link}
//                     />
//                   </div>

//                   <div className="flex justify-end space-x-4 mt-4">
//                     <button
//                       onClick={showPreviousVideo}
//                       className="bg-orange-500 text-white px-4 py-2 rounded"
//                       disabled={currentVideoIndex === 0}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={showNextVideo}
//                       className="bg-orange-500 text-white px-4 py-2 rounded"
//                       disabled={currentVideoIndex === course.length - 1}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold  mb-4 text-blue-500">
//                   All Video Names
//                 </h2>
//                 <ol className="pl-4 border-t border-b border-blue-300">
//                   {course?.map((video, index) => (
//                     <li
//                       key={video._id}
//                       className={`cursor-pointer py-2 px-6 rounded-md border-b border-blue-300 ${
//                         currentVideoIndex === index ? "bg-blue-300" : ""
//                       } text-xl`}
//                       onClick={() => selectVideo(index)}
//                     >
//                       {index + 1}. {video?.title}
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseVedioPlaylistPage;



'use client'
import { useGetMyCourseVedioPlaylistQuery } from '@/redux/api/videoApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import YoutubePlaylist from './playlist';


const Play = () => {
  const params = useParams();
  const id = params?.id;
  const { data: course } = useGetMyCourseVedioPlaylistQuery(id);
  const [videos, setVideos] = useState([]);
  const apiKey = 'AIzaSyBZ5EMCEWwIV7h7UVVbinObGvG3cFdLj58';
  const maxVideosToShow = 50;
  const extractPlaylistIdFromUrl = (url) => {
    const regex = /(?:list=)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        let allVideos = [];

        if (course && course.length > 0) {
          for (const playlist of course) {
            const playlistID = extractPlaylistIdFromUrl(playlist.playlist_link);
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&key=${apiKey}&maxResults=${maxVideosToShow}`
            );

            const playlistVideos = response.data.items.map((item) => ({
              title: item.snippet.title,
              videoId: item.snippet.resourceId.videoId,
            }));

            allVideos = [...allVideos, ...playlistVideos];
          }

          setVideos(allVideos);
          setSelectedVideo(allVideos[0]?.videoId);
          setCurrentPlaylistIndex(0);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchAllPlaylists();
  }, [course, apiKey, maxVideosToShow]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const showPreviousPlaylist = () => {
    setCurrentPlaylistIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
    setSelectedVideo(videos[currentPlaylistIndex === 0 ? videos.length - 1 : currentPlaylistIndex - 1]?.videoId);
  };
  const showNextPlaylist = () => {
    setCurrentPlaylistIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
    setSelectedVideo(videos[currentPlaylistIndex === videos.length - 1 ? 0 : currentPlaylistIndex + 1]?.videoId);
  };
  const onVideoClick = (videoId, index) => {
    setSelectedVideo(videoId);
    setCurrentPlaylistIndex(index);
  };
  const opts = {
    width: '600',
    height: '360',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="lg:flex mt-14">
      <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3">
        {videos && videos.length > 0 && videos[currentPlaylistIndex]?.title}
        <YouTube key={selectedVideo || 'defaultKey'} videoId={selectedVideo || ''} opts={opts}  className='md:w-full'/>

        <div className="flex justify-between mt-4">
          <button
            onClick={showPreviousPlaylist}
            className="bg-orange-500 text-white px-4 py-2 rounded"
            disabled={currentPlaylistIndex === 0}
          >
            Prev
          </button>
          <button
            onClick={showNextPlaylist}
            className="bg-orange-500 text-white px-4 py-2 rounded"
            disabled={currentPlaylistIndex === videos.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-96">
        <YoutubePlaylist videos={videos} course={course} currentPlaylistIndex={currentPlaylistIndex} onVideoClick={onVideoClick} />
      </div>
    </div>

  );
};


export default Play;
