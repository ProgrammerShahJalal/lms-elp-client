"use client";
import AllNoticesPage from "@/components/dashboard/admin/AllNoticesPage";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const AdminNoticeCreatePage = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) =>{
        console.log(data)
    }

    const handleDelete = async (categoryId) => {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });
    
          if (result.isConfirmed) {
            // User confirmed deletion
            // const res = await deleteCategory(categoryId);
            // console.log(res?.data)
    
            if (res?.data?._id === categoryId) {
              // Item deleted successfully
              Swal.fire({
                title: "Deleted!",
                text: "Notice has been deleted.",
                icon: "success",
              });
            } else {
              // Something went wrong with deletion
              Swal.fire({
                title: "Error!",
                text: "Something went wrong with deletion.",
                icon: "error",
              });
            }
          }
        } catch (err) {
          // Handle any errors that occur during the process
          toast.error(err.message);
        }
      };
  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-4"> নোটিশ যোগ করুন </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">

      <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Notice Title</label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Notice Description</label>
          <textarea rows={5}
            type="text"
            name="title"
            {...register("title", { required: true })}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
         
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Notice
        </button>
        </div>
      </form>
  <AllNoticesPage/>

    </div>
  );
};

export default AdminNoticeCreatePage;
