'use client'
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
            <button
                className="block lg:hidden px-2 py-1 "
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <div
                className={` h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-between items-center mt-16">
                    {isOpen && (
                        <button className="text-white" onClick={closeSidebar}>
                            ✕
                        </button>
                    )}
                </div>



                <ul className="menu p-4 bg-white">
                    {role === 'admin' ? (
                        <>

                            <ul className="py-2 ">
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addexams'}><PiExamFill />পরীক্ষা যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addcategory'}> <FaAddressBook />বিভাগ যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addsubcategory'}> <FaAddressBook />উপ বিভাগ যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addcourse'}> <SiCoursera />কোর্স যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addbooks'}> <FaBookOpen />বই যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addquiz'}><MdQuiz /> কুইজ যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addquestions'}><BsFillQuestionSquareFill /> প্রশ্ন যোগ করুন</Link></li>
                                <li className="px-4 py-2  cursor-pointer"><Link href={'/admin/addvideo'}> <FaFileVideo />ভিডিও যোগ করুন</Link> </li>
</ul>
                           
                        </>
                    ) : role === 'super_admin' ? (
                        <>

                            

                            <ul className="py-2 text-white">
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"><Link href={'/superAdmin/allusers'}>ব্যবহারকারী</Link></li>

                            </ul>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li>
                                    <Link href="/profile" className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><ImProfile fontSize={20} />  প্রোফাইল</Link>
                                </li>
                                <br />
                                <li>
                                    <Link href="/user/mycourses" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><SiCoursera fontSize={18} /> আমার  কোর্স</Link>
                                </li>
                                <br />
                                <li>
                                    <Link href="/user/userorder" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><FaBorderAll fontSize={18} /> অর্ডার হিসট্রি</Link>
                                </li>
                                <br />
                                <li>
                                    <Link href="/user/membershipplan" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান</Link>
                                </li>

                                <br /> <br />
                                <li>
                                    <Link href="/" className=" "> <Image src="https://i.ibb.co/q1gL2Zp/app-img.png" alt="app-img" width={200} height={40} />  </Link>
                                </li>
                            </ul>
                        </>
                    )}
                    <div className="divider"></div>

                </ul>




            </div>
        </>


    )
}

export default UserSidebar;

