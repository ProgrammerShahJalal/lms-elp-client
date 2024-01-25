'use client'

import { useGetSingleCoursePlaylistQuery, useUpdateCoursePlaylistMutation } from "@/redux/api/videoApi";

const UpdateCoursePlaylistEditPage = ({params}) => {
    const {id} = params;

    const {data:singleCoursePLaylist} = useGetSingleCoursePlaylistQuery(id);
    const [updateCoursePlaylist] = useUpdateCoursePlaylistMutation();
    
    return (
        <div>
            
        </div>
    );
};

export default UpdateCoursePlaylistEditPage;