'use client'
import { useGetMyCourseVedioPlaylistQuery } from "@/redux/api/videoApi";
import { useParams } from "next/navigation";


const CourseVedioPlaylistPage = () => {
    
    const params = useParams();
    const id = params?.id;
    // console.log(params.id,'from details page');

    const {data} = useGetMyCourseVedioPlaylistQuery(id);
    // console.log(data, 'data vedio')
    return (
        <div>
            <h2>hello  </h2>
        </div>
    );
};

export default CourseVedioPlaylistPage;