import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from "react";
const YoutubePlaylist = ({ videos, course, currentPlaylistIndex, onVideoClick }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <div className='flex justify-between items-center' onClick={toggleCollapse}>
                <h5 className="text-2xl  cursor-pointer " >{course && course.length > 0 && course[currentPlaylistIndex]?.title}
                </h5>
                <span className='text-xl mr-12'>{isCollapsed ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>

            {!isCollapsed && (
                <ul>
                    {videos.map((video, index) => (
                        <div key={index}>
                            <p
                                className={`cursor-pointer py-2 px-6 rounded-md border-b border-blue-300  text-lg ${currentPlaylistIndex === index ? 'bg-blue-300' : ''} `}
                                onClick={() => onVideoClick(video.videoId, index)}
                            >
                                {index + 1}) {video.title}
                            </p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YoutubePlaylist;