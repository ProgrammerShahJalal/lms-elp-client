'use client'

import { useGetSingleQuestionQuery, useUpdateQuestionMutation } from "@/redux/api/questionsApi";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateQuestionPage = ({params}) => {
    
    const { register, handleSubmit, reset,setValue } = useForm();
    const router = useRouter();
    const { id } = params;
  
    const { data } = useGetSingleQuestionQuery(id);
    console.log(data)
    const [updateQuestion] = useUpdateQuestionMutation();
  
   
  
    // useEffect(() => {
    //   if (data) {
    //     // banner: data?.file?.name,
        
    //     setValue("title", data?.title);
    //     setValue("playlist_link", data?.playlist_link);
    //     setValue("course_id", data?.course_id || "");
        
    //   }
    // }, [data, setValue]);
    const onSubmit = async (data) => {
      console.log(data);
      try {
        const res = await updateQuestion({ id, body: data });
        console.log(res);
        if (res?.data?._id === id) {
          toast.success(" broad Question updated successfully");
          router.push("/admin/addquestions");
        } else {
          toast.error("Something is wrong to update question");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
  
    // const defaultValues = {
    //   title: data?.title,
    //   course_id: data?.course_id,
    //   playlist_link: data?.playlist_link,
    // };
    return (
        <div>
            <h2>Update Question {id}</h2>

            <div>
      <form onSubmit={handleSubmit(onSubmit)} >
     <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
        Question
        </label>
        <input
          required
          type="text"
          name="title"
          {...register("title")}
          
          className="mt-1 p-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

        
   

      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
           Mark
          </label>
          <input
            type="text"
            required
            name="playlist_link"
            {...register("playlist_link")}
           
            className="mt-1 p-2 w-96  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

       

        <input
          type="submit"
          value="Update Question"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 cursor-pointer "
        />
      </form>
    </div>
        </div>
    );
};

export default UpdateQuestionPage;