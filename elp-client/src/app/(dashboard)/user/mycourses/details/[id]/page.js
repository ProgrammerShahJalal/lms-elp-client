'use client'
import { useGetMyCourseVedioPlaylistQuery } from '@/redux/api/videoApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import YoutubePlaylist from './playlist';
import { getUserInfo } from '@/services/auth.service';
import { useGetSingleUserQuery } from '@/redux/api/authApi';

const Play = () => {

// Disable right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

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

  let opts;

if (window.innerWidth >= 1024) {
  opts = {
    width: '600',
    height: '340',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      fs: 1,
      autohide: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };
} else { 
  opts = {
    width: '100%',
    height: '300',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      fs: 1,
      autohide: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };
}

const { userId } = getUserInfo();
const { data } = useGetSingleUserQuery(userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14 select-none	">
      <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 relative ">
        {videos && videos.length > 0 && videos[currentPlaylistIndex]?.title}
        <YouTube key={selectedVideo || 'defaultKey'} videoId={selectedVideo || ''} opts={opts} />
        <small className='z-50 absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 shadow-sm'> {data?.contact_no}</small> 
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
