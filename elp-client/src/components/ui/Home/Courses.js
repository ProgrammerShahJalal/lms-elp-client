'use client'
import Link from "next/link";
import CourseCard from "./course/CourseCard";
import { useGetCoursesQuery } from "@/redux/api/authApi";

const Courses = () => {
  const {data} = useGetCoursesQuery();

  console.log(data)
  return (
    <div className="px-14 py-10">
    <div className="flex gap-5">
    <h2 className="text-2xl font-bold px-2  rounded">ক্যারিয়ার ট্র্যাক কোর্স</h2>
    <Link href="/" className="mb-5 bg-cyanPrimary w-44 text-white px-7 py-3 rounded">সব কোর্স দেখুন</Link>
    </div>
      <div className="grid lg:grid-cols-3  gap-4">
        
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
        
        
       
       
       
        
      </div>
    </div>
  );
};

export default Courses;
