"use client";

import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import InitialLoader from "../Loader/InitialLoader";
import Error from "../Loader/Error";

const NoticePage = () => {
  const { data, isLoading, isError } = useGetAllNoticesQuery();
  const allNotices = data?.notices?.data;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
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
      <div className="flex  items-center" >
        <div className="bg-green-500 text-white px-3 rounded py-4">
          <h2>{formatDate(item?.createdAt)}</h2>
          {/* <h2>February</h2>
         <h1 className="font-bold text-2xl">21</h1> */}
        </div>
        <div className="text-gray-500 pl-5">
          <h2 className="font-bold text-xl">{item?.title}</h2>
          <p>{item?.description}</p>
        </div>
      </div>
      </div>
    ));
  }

  return (
    <>
      <div className="my-20">
        <h2 className="text-center font-bold text-3xl my-4">সব নোটিশ দেখুন</h2>
        <div className="my-5 space-y-4">
          {content}
        </div>
      </div>
    </>
  );
};

export default NoticePage;
