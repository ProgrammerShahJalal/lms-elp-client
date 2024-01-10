'use client'
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import { MdModeEditOutline } from "react-icons/md";

const UserProfileInfo = () => {
  const { userId, email } = getUserInfo();
  // console.log(getUserInfo())
  const { data } = useGetSingleUserQuery(userId);
  // console.log(data)


  return (
    <div className=" rounded-lg py-5 border border-gray-200 ">
      <div className="flex items-center justify-between px-10">
        <div>
          <h2 className="text-2xl font-bold">আপনার নামঃ {data?.name} </h2>

        </div>
        <div>
          <Link
            href={`/profile/edit/${data?._id}`}
            className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
          >
            <span>এডিট করুন</span> <MdModeEditOutline />
          </Link>
        </div>
      </div>


      <div className="pl-10 w-96">
        <h5 className="text-lg font-semibold py-3">মোবাইল নাম্বার: {data?.contact_no}</h5>

        <div className="flex justify-between items-center">
          <div>
            {/* <h3 className="text-lg font-semibold py-1">ইমেইল</h3> */}
            <h5 className="text-md font-semibold py-1">ইমেইল: {data?.email}</h5>
          </div>
          {/* <div className="text-left">
            <h3 className="text-lg font-semibold py-1">জন্ম তারিখ</h3>
            <h5 className="text-md font-semibold py-1" >12-05-1993</h5>
          </div> */}
        </div>

        <div className="flex justify-between items-center mt-3">
          {/* <div>
            <h3 className="text-lg font-semibold py-1">আপনি একজন </h3>
            <h5 className="text-md font-semibold py-1">নারী</h5>
          </div> */}
          {/* <div className="">
            <h3 className="text-lg font-semibold py-1 " > ঠিকানা</h3>
            <h5 className="text-md font-semibold py-1" >abdduy</h5>
          </div> */}
        </div>
      </div>


    </div>
  );
};

export default UserProfileInfo;
