"use client";

import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const AllCourses = () => {
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
  const breadcrumbItems = [{ label: "হোম", link: "/" }, { label: " সব কোর্স" }];

  return (
    <>
      <Commonbanner title="সব কোর্স" breadcrumbItems={breadcrumbItems} />
      <div className="px-14 py-10">
        <div className="">
          <h2 className="text-2xl font-bold  rounded text-center py-10"> কোর্স</h2>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
      </div>
    </>
  );
};

export default AllCourses;
