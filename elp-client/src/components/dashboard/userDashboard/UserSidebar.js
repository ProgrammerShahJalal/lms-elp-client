"use client";
import Image from "next/image";
import Link from "next/link";
import { FaAddressBook, FaBookOpen, FaFileVideo } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";
import { FaBorderAll } from "react-icons/fa6";
import { MdRememberMe, MdQuiz } from "react-icons/md";
import { useState } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";

const UserSidebar = () => {
  const { role, userId } = getUserInfo();

  const { data: user } = useGetSingleUserQuery(userId);
  //   console.log(user)

  // console.log(role, 'basic dash')

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="block lg:hidden px-2 py-1 " onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`bg-gray-200 h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform lg:transform-none ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center mt-16">
          {isOpen && (
            <button className="text-black font-bold text-xl" onClick={closeSidebar}>
              ✕
            </button>
          )}
        </div>

        <ul className="menu ">
          {role === "admin" ? (
            <>
              <ul className=" text-start">
                <li>
                  <Link
                    href="/profile"
                    className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "
                  >
                    <ImProfile fontSize={20} /> প্রোফাইল
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/addTest"
                    className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "
                  >
                    <ImProfile fontSize={20} /> Test Driven
                  </Link>
                </li>
                <li className="">
                  <Link href={"/admin/addcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200">
                    {" "}
                    <FaAddressBook />
                    বিভাগ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addsubcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaAddressBook />
                    উপ বিভাগ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addcourse"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <SiCoursera />
                    কোর্স যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addvideo"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaFileVideo />
                    ভিডিও যোগ করুন
                  </Link>{" "}
                </li>
                <li >
                  <Link href={"/admin/addexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <PiExamFill />
                    পরীক্ষা যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addquiz"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <MdQuiz /> কুইজ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addquestions"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addbooks"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    বই যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/allorders"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব অর্ডার সমূহ
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/alluserscourses"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব কেনা কোর্স সমূহ
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/allexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব পরিক্ষা  সমূহ
                  </Link>
                </li>
              </ul>
            </>
          ) : role === "super_admin" ? (
            <>
              <ul className="text-start">
                <li>
                  <Link
                    href="/profile"
                    className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "
                  >
                    <ImProfile fontSize={20} /> প্রোফাইল
                  </Link>
                </li>
                <li >
                  <Link href={"/superAdmin/allusers"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  px-6  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "> <ImProfile fontSize={20} />ব্যবহারকারী</Link>
                </li>
                <li >
                  <Link href={"/superAdmin/alladmin"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900  px-6  py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 "> <ImProfile fontSize={20} />সকল এডমিন</Link>
                </li>
                <li >
                  <Link href={"/admin/addcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaAddressBook />
                    বিভাগ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addsubcategory"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900    py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaAddressBook />
                    উপ বিভাগ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addcourse"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-5 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <SiCoursera fontSize={20} />
                    কোর্স যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addvideo"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaFileVideo />
                    ভিডিও যোগ করুন
                  </Link>{" "}
                </li>
                <li >
                  <Link href={"/admin/addexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <PiExamFill />
                    পরীক্ষা যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addquiz"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <MdQuiz /> কুইজ যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addquestions"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    <BsFillQuestionSquareFill /> লিখিত প্রশ্ন যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/addbooks"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    বই যোগ করুন
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/allorders"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব অর্ডার সমূহ
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/alluserscourses"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব কেনা কোর্স সমূহ
                  </Link>
                </li>
                <li >
                  <Link href={"/admin/allexams"} className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-4 hover:text-white rounded flex items-center gap-3 bg-gray-200 ">
                    {" "}
                    <FaBookOpen />
                    সব পরিক্ষা  সমূহ
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link
                    href="/profile"
                    className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <ImProfile fontSize={20} /> প্রোফাইল
                  </Link>
                </li>
                <br />
                <li>
                  <Link
                    href="/user/mycourses"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <SiCoursera fontSize={18} /> আমার কোর্স
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/mypdfbook"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900  py-2 hover:text-white rounded flex items-center gap-3 mt-2"
                  >
                    <SiCoursera fontSize={18} /> আমার কেনা  বইসমুহ
                  </Link>
                </li>
                <br />
                <li>
                  <Link
                    href="/user/myexams"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <SiCoursera fontSize={18} /> আমার পরিক্ষাসমুহ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/myresults"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3  mt-3"
                  >
                    <SiCoursera fontSize={18} /> আমার রেজাল্টসমূহ
                  </Link>
                </li>
                <br />
                <li>
                  <Link
                    href="/user/userorder"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <FaBorderAll fontSize={18} /> অর্ডার হিসট্রি
                  </Link>
                </li>
                <br />
                {/* <li>
                  <Link
                    href="/user/membershipplan"
                    className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "
                  >
                    <MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান
                  </Link>
                </li> */}
                <br /> <br />
                <li>
                  <Link href="/" className=" ">
                    {" "}
                    <Image
                      src="https://i.ibb.co/q1gL2Zp/app-img.png"
                      alt="app-img"
                      width={200}
                      height={40}
                    />{" "}
                  </Link>
                </li>
              </ul>
            </>
          )}
          <div className="divider"></div>
        </ul>
      </div>
    </>
  );
};

export default UserSidebar;
