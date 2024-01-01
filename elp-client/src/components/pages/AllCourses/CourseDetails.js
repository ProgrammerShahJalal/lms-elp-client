'use client'
import Commonbanner from "@/components/banners/Commonbanner";
import CourseDetailsData from "./CourseDetailsData";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";


const CourseDetails = ({id}) => {

    const {data,isLoading,isError} = useGetSingleCourseQuery(id);
    



    const breadcrumbItems = [
        { label: 'হোম', link: '/' },
        { label: ' কোর্সসমূহ ',link: '/courses' },
        { label: ' কোর্স  ডিটেইলস ', }
      ];
  return (
    <div>
         <Commonbanner title="কোর্স  ডিটেইলস" breadcrumbItems={breadcrumbItems}/>

         <div className="lg:mx-14 sm:mx-10 md:mx-5">
            <CourseDetailsData data={data} isLoading={isLoading} isError={isError} />
         </div>

    </div>
  )
}

export default CourseDetails