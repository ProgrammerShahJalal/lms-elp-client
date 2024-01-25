'use client'


import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetSingleSubCategoryQuery, useUpdateSubCategoryMutation } from "@/redux/api/subcategoryApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateSubCategoryPage = ({params}) => {
    const {id} = params;
    const { register, handleSubmit, reset } = useForm();
    const {data} = useGetSingleSubCategoryQuery(id);
    const router = useRouter();
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
      } = useGetAllCategoriesQuery();

    const [updateSubCategory] = useUpdateSubCategoryMutation()
    // console.log(data)

    const onSubmit = async (data) => {
      const content = { ...data };
      const file = content["file"];
      
      const result = JSON.stringify(content);
     
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("data", result);
      
        try {
          const res = await updateSubCategory({ id, body: formData});
         
          if (res?.data?._id === id) {
            toast.success(" Sub Category updated successfully");
            router.push("/admin/addsubcategory");
          } else {
            toast.error("Something is wrong updating the category");
          }
        } catch (err) {
          toast.error(err.message);
        }
      };

  const defaultValues = {
    title: data?.title,
    icon: data?.file?.name
  };

    return (
        <div>
            


            <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Sub Category Name</label>
          <input
            type="text"
            name="title"
            {...register("title")}
            defaultValue={data?.title}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select

            {...register("category_id", { required: true })}

            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.categories?.map((category) => (
              <option key={category?.id} value={category?._id}>
                {category?.title}
              </option>
            ))}
          </select>
        </div>
     <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Sub Category Icon</label>
          <input
            type="file"
            name="file"
            {...register("file")}
            // defaultValue={data?.file?.name}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Category
        </button>
      </form>

        </div>
    );
};

export default UpdateSubCategoryPage;