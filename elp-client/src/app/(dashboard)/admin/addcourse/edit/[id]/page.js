import EditCourse from "@/components/dashboard/admin/EditCourse";
import { useGetAllCoursesQuery } from "@/redux/api/courseApi";

const EditCoursePage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <EditCourse id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data: courses } = useGetAllCoursesQuery({
    limit: 100,
    page: 1,
  });
  return courses?.courses?.data?.map((data) => ({ id: data?._id }));
}

export default EditCoursePage;
