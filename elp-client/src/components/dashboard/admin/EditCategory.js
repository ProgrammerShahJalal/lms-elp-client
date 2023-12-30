'use client'

import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditCategory = ({id}) => {
    const { register, handleSubmit, reset } = useForm();
    const {data} = useGetSingleCategoryQuery(id);
    const router = useRouter();

    const [updateCategory] = useUpdateCategoryMutation()
    // console.log(data)

    const onSubmit = async (data) => {
        const { title, file } = data;
        console.log(data,'first')
      
        const formData = new FormData();
        formData.append("title", title);
        // formData.append("file", file[0]);
      
        try {
          const res = await updateCategory({ id, body: data});
          console.log(res, 'after fetching');
        //   if (res?.data?._id === id) {
        //     toast.success("Category updated successfully");
        //     router.push("/admin/addcategory");
        //   } else {
        //     toast.error("Something is wrong updating the category");
        //   }
        } catch (err) {
          toast.error(err.message);
        }
      };

  const defaultValues = {
    title: data?.title,
    // icon: data?.file?.name
  };

    return (
        <div>
            <h2>hello category edit page {id}</h2>


            <form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Name</label>
          <input
            type="text"
            name="title"
            {...register("title")}
            defaultValue={data?.title}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
    {/* { <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category Icon</label>
          <input
            type="file"
            name="file"
            {...register("file")}
            // defaultValue={data?.file?.name}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>} */}
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

export default EditCategory;