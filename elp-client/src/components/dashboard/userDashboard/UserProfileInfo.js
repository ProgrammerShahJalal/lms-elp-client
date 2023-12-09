import Link from "next/link";
import React from "react";
import { MdModeEditOutline } from "react-icons/md";

const UserProfileInfo = () => {
  return (
    <div className="bg-white rounded-lg py-5 border border-gray-200 ">
      <div className="flex items-center justify-between px-10">
        <div>
          <h2 className="text-2xl font-bold">Jesmin Akhter</h2>
          
        </div>
        <div>
          <Link
            href="/user/profile/edit/1"
            className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
          >
            <span>এডিট করুন</span> <MdModeEditOutline />
          </Link>
        </div>
      </div>


      <div className="pl-10 w-96">
        <h5 className="text-lg font-semibold py-3">+880 1753 659023</h5>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold py-1">ইমেইল</h3>
             <h5 className="text-md font-semibold py-1">abc@gmail.com</h5>
          </div>
          <div className="text-left">
          <h3 className="text-lg font-semibold py-1">জন্ম তারিখ</h3>
             <h5 className="text-md font-semibold py-1" >12-05-1993</h5>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <h3 className="text-lg font-semibold py-1">আপনি একজন </h3>
             <h5 className="text-md font-semibold py-1">নারী</h5>
          </div>
           <div className="">
          <h3 className="text-lg font-semibold py-1 " > ঠিকানা</h3>
             <h5 className="text-md font-semibold py-1" >abdduy</h5>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default UserProfileInfo;
