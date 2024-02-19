import EditQuestion from "@/components/dashboard/admin/EditQuestion";
import { useGetAllQuestionsQuery } from "@/redux/api/questionsApi";

const EditQuestionPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <EditQuestion id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data: questions } = useGetAllQuestionsQuery({
    limit: 10000,
    page: 1,
  });
  return questions?.categories?.data?.map((data) => ({ id: data?._id }));
}

export default EditQuestionPage;
