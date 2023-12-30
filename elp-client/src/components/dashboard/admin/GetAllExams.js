"use client";

import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useDeleteExamMutation, useGetAllExamsQuery } from "@/redux/api/examsApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const GetAllExams = () => {
  const { data, isLoading, isError } = useGetAllExamsQuery();
  const [deleteExam] = useDeleteExamMutation()
//   console.log(data?.exams?.data);
  const examsData = data?.exams?.data;

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteExam(id);
        // console.log(res?.data)
  
        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
         
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error"
          });
         
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && examsData?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && examsData?.length > 0) {
    content = examsData?.map((item, i) => (
      <tr key={item?._id} className="block md:table-row">
        <td className="py-2  px-1 border-b md:table-cell flex">
          <span className="text-bluePrimary">{i + 1}</span> {item?.title}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          {item?.course_id?.title}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          {item?.duration_in_minutes}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          {item?.exam_type === "0" ? (
            <span className="text-bluePrimary">Quiz</span>
          ) : (
            <span className="text-yellowPrimary">Questions</span>
          )}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">{item?.fee}</td>
        <td className="py-2 px-4 border-b md:table-cell">
          {item?.is_active ? (
            <span className="text-bluePrimary">True</span>
          ) : (
            <span className="text-red-400">False</span>
          )}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          {item?.total_marks}
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          <button className="bg-blue-500 text-white py-1 px-2 rounded-md">
            Update
          </button>
        </td>
        <td className="py-2 px-4 border-b md:table-cell">
          <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={()=> handleDelete(item?._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold py-5"> All Exams are here</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Course Name</th>
              <th className="py-2 px-4 border-b">Minutes</th>
              <th className="py-2 px-4 border-b">Exam Type</th>
              <th className="py-2 px-4 border-b">Fee</th>
              <th className="py-2 px-4 border-b">IsActive</th>
              <th className="py-2 px-4 border-b">Total Marks</th>
              <th className="py-2 px-4 border-b">Update</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllExams;
