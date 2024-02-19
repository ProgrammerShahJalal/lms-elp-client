import EditCategory from "@/components/dashboard/admin/EditCategory";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";

const EditCategoryPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <EditCategory id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data: categories } = useGetAllCategoriesQuery({
    limit: 100,
    page: 1,
  });

  return categories?.categories?.map((data) => ({ id: data?._id }));
}

export default EditCategoryPage;
