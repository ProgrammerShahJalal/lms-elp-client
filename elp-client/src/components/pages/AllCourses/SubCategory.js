"use client";

import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Commonbanner from "@/components/banners/Commonbanner";
import CourseCard from "@/components/ui/Home/course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const SubCategory = ({ id }) => {
  const { data, isError, isLoading } = useGetAllCoursesQuery({ limit: 500 });
  const coursesData = data?.courses?.data;

  const filterCourseDta = coursesData?.filter(
    (item) => item?.sub_category_id?.id === id
  );

  // (filterCourseDta)

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && filterCourseDta?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && filterCourseDta?.length > 0) {
    content = filterCourseDta?.map((item) => (
      <CourseCard key={item?._id} item={item} />
    ));
  }
  const breadcrumbItems = [
    { label: "হোম", link: "/" },
    { label: "কোর্সসমূহ", link: "/courses" },
    // { label: 'ক্যাটাগরি', link:'/courses/category' },
    {
      label: `${filterCourseDta?.[0]?.sub_category_id?.category_id?.title} - ${filterCourseDta?.[0]?.sub_category_id?.title}`,
    },
  ];

  return (
    <div>
      <Commonbanner title="সাব ক্যাটাগরি" breadcrumbItems={breadcrumbItems} />
      <div className="mx-14 my-20">
        <h2 className="text-center font-bold text-xl pb-10 text-yellowPrimary">
          {filterCourseDta?.[0]?.sub_category_id?.category_id?.title} -{" "}
          {filterCourseDta?.[0]?.sub_category_id?.title}
        </h2>
        <div className="grid lg:grid-cols-3  gap-4">{content}</div>
      </div>
    </div>
  );
};

export default SubCategory;
