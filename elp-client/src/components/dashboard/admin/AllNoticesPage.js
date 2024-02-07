"use client";

import Pagination from "@/app/(dashboard)/Pagination";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import {
  useDeleteNoticeMutation,
  useGetAllNoticesQuery,
} from "@/redux/api/noticeApi";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllNoticesPage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllNoticesQuery({ limit, page });
  const [deleteNotice] = useDeleteNoticeMutation();
  const allNotices = data?.notices?.data;


const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

  const totalData = data?.notices?.meta?.total;
  const totalPages = Math.ceil(totalData / limit);

  const [expandedNoticeId, setExpandedNoticeId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  const handleDelete = async (id) => {
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
        const res = await deleteNotice(id);
        // console.log(res?.data)

        if (res?.data?._id === id) {
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

  if (!isLoading && !isError && allNotices?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>এখন কোন নোটিশ নাই</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && allNotices?.length > 0) {
    content = allNotices?.map((item) => (
      <div className=" bg-white rounded-lg shadow-lg border-b-2" key={item?.id}>
        <div className="flex items-center" onClick={() => toggleDescription(item?.id)}>
          <div className="bg-green-500 text-white px-3 rounded py-4">
            <h2>{formatDate(item?.createdAt)}</h2>
          
          </div>
          <div className="text-gray-500 pl-5">
            <h2 className="font-bold text-xl">{item?.title}</h2>
            {expandedNoticeId === item?.id && <p>{item?.description}</p>}
            <button
              className="bg-red-500 text-white my-4 mb-4 px-2 rounded-md cursor-pointer hover:bg-red-700"
              onClick={() => handleDelete(item?.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-4">সব নোটিশ দেখুন</h2>
      <div className="my-5 space-y-4">{content}</div>

      <Pagination totalPages={totalPages} currentPage={page} setPage={setPage}/>
    </div>
  );
};

export default AllNoticesPage;
