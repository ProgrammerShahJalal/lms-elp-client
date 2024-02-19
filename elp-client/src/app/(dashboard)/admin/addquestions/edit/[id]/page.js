// "use client";
import EditQuestion from "@/components/dashboard/admin/EditQuestion";
import axios from "axios";
import { useParams } from "next/navigation";

const EditQuestionPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <EditQuestion id={id} />
    </div>
  );
};

// export async function generateStaticParams() {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`,
//     {
//       headers: {
//         Authorization: process.env.SUPER_ADMIN_TOKEN,
//       },
//     }
//   );
//   return data?.data?.data?.map((data) => ({ id: data?._id }));
// }

export default EditQuestionPage;
