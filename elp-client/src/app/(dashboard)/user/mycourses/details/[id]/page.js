

// 'use client'
// import { useGetMyCourseVedioPlaylistQuery } from '@/redux/api/videoApi';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import YouTube from 'react-youtube';
// import axios from 'axios';
// import YoutubePlaylist from './playlist';


// const Play = () => {
//   const params = useParams();
//   const id = params?.id;
//   const { data: course } = useGetMyCourseVedioPlaylistQuery(id);
//   const [videos, setVideos] = useState([]);
//   const apiKey = 'AIzaSyBZ5EMCEWwIV7h7UVVbinObGvG3cFdLj58';
//   const maxVideosToShow = 50;
//   const extractPlaylistIdFromUrl = (url) => {
//     const regex = /(?:list=)([a-zA-Z0-9_-]+)/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };
//   useEffect(() => {
//     const fetchAllPlaylists = async () => {
//       try {
//         let allVideos = [];

//         if (course && course.length > 0) {
//           for (const playlist of course) {
//             const playlistID = extractPlaylistIdFromUrl(playlist.playlist_link);
//             const response = await axios.get(
//               `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&key=${apiKey}&maxResults=${maxVideosToShow}`
//             );

//             const playlistVideos = response.data.items.map((item) => ({
//               title: item.snippet.title,
//               videoId: item.snippet.resourceId.videoId,
//             }));

//             allVideos = [...allVideos, ...playlistVideos];
//           }

//           setVideos(allVideos);
//           setSelectedVideo(allVideos[0]?.videoId);
//           setCurrentPlaylistIndex(0);
//         }
//       } catch (error) {
//         console.error('Error fetching playlists:', error);
//       }
//     };

//     fetchAllPlaylists();
//   }, [course, apiKey, maxVideosToShow]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
//   const showPreviousPlaylist = () => {
//     setCurrentPlaylistIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
//     setSelectedVideo(videos[currentPlaylistIndex === 0 ? videos.length - 1 : currentPlaylistIndex - 1]?.videoId);
//   };
//   const showNextPlaylist = () => {
//     setCurrentPlaylistIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
//     setSelectedVideo(videos[currentPlaylistIndex === videos.length - 1 ? 0 : currentPlaylistIndex + 1]?.videoId);
//   };
//   const onVideoClick = (videoId, index) => {
//     setSelectedVideo(videoId);
//     setCurrentPlaylistIndex(index);
//   };
//   const opts = {
//     width: '100%',
//     height: '360',
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
//       <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3">
//         {videos && videos.length > 0 && videos[currentPlaylistIndex]?.title}
//         <YouTube key={selectedVideo || 'defaultKey'} videoId={selectedVideo || ''} opts={opts} />

//         <div className="flex justify-between mt-4">
//           <button
//             onClick={showPreviousPlaylist}
//             className="bg-orange-500 text-white px-4 py-2 rounded"
//             disabled={currentPlaylistIndex === 0}
//           >
//             Prev
//           </button>
//           <button
//             onClick={showNextPlaylist}
//             className="bg-orange-500 text-white px-4 py-2 rounded"
//             disabled={currentPlaylistIndex === videos.length - 1}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <div className="overflow-y-auto max-h-96">
//         <YoutubePlaylist videos={videos} course={course} currentPlaylistIndex={currentPlaylistIndex} onVideoClick={onVideoClick} />
//       </div>
//     </div>

//   );
// };


// export default Play;