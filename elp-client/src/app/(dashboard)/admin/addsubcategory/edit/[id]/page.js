import EditSubCategory from "@/components/dashboard/admin/EditSubCategory";
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";

const EditSubCategoryPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <EditSubCategory id={id} />
    </div>
  );
};

export async function generateStaticParams() {
  const { data: subCategories } = useGetAllSubcategoriesQuery({
    limit: 100,
    page: 1,
  });
  return subCategories?.subcategories?.map((data) => ({ id: data?._id }));
}

export default EditSubCategoryPage;
