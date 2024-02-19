import EditExam from "@/components/dashboard/admin/EditExam";
import { useGetAllExamsQuery } from "@/redux/api/examsApi";

const ExamEditPage = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <EditExam id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data, isLoading, isError } = useGetAllExamsQuery({
    limit: 10000,
    page: 1,
  });
  return data?.exams?.map((data) => ({ id: data?._id }));
}

export default ExamEditPage;
