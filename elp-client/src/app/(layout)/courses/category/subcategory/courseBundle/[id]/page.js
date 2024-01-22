'use client'
import { useGetAllCoursesBundlesQuery, useGetAllCoursesQuery } from "@/redux/api/courseApi";


const CourseBundleIdPage = ({params}) => {
    const id = params?.id;
    const {data} = useGetAllCoursesBundlesQuery({
        sub_category_id: id
    });
    const {data:subCatCourses} = useGetAllCoursesQuery({
        sub_category_id: id
    })
    // console.log(subCatCourses)
    return (
        <div>
            <h2>Hello {id}</h2>
        </div>
    );
};

export default CourseBundleIdPage;