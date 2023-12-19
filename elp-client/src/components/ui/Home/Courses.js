"use client";
import Link from "next/link";
import CourseCard from "./course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const Courses = () => {
  const { data, isError, isLoading } = useGetAllCoursesQuery();
  const coursesData = data?.courses?.data;

  let content = null;

  if (isLoading) {
    content = (
      <>
        <div>Loading.......</div>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h5>There was an error</h5>;
  }

  if (!isLoading && !isError && coursesData?.length === 0) {
    content = (
      <>
        {" "}
        <p>There is no data</p>
      </>
    );
  }

  if (!isLoading && !isError && coursesData?.length > 0) {
    content = coursesData?.map((item) => <CourseCard key={item?._id} item={item} />);
  }

  return (
    <div className="px-14 py-10">
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold px-2  rounded">ক্যারিয়ার ট্র্যাক কোর্স</h2>
        <Link href="/courses" className="mb-5 bg-cyanPrimary w-44 text-white px-7 py-3 rounded">
          সব কোর্স দেখুন
        </Link>
      </div>
      <div className="grid lg:grid-cols-3  gap-4">{content}</div>
    </div>
  );
};

export default Courses;
