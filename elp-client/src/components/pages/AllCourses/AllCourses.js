"use client";

import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetCoursesQuery } from "@/redux/api/authApi";

const AllCourses = () => {
    const {data} = useGetCoursesQuery()
  return (
    <>
      <div className="px-14 py-10">
        <div className="">
          <h2 className="text-2xl font-bold  rounded text-center py-10"> কোর্স</h2>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">
          {data?.map((item) => (
            <CourseCard key={item?._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCourses;
