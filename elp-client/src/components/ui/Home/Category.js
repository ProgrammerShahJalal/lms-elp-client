import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon1 from "../../../assets/images/learn-icon.svg";
import icon2 from "../../../assets/images/icon2.png";

const Category = () => {
  return (
    <div className=" px-14 py-20 ">
      <div className="lg:flex items-center justify-between my-4">
        <div>
          <h2 className="lg:text-3xl md:text-2xl font-semibold ">
            আমাদের কোর্সসমূহ থেকে বেছে নিন আপনার পছন্দের কোর্স
          </h2>
          <h5 className="lg:text-xl py-4 mb-3">
            দেশসেরা ইন্সট্রাক্টরদের সেরা সব কোর্স এখন এক প্ল্যাটফর্মে।
          </h5>
        </div>
        {/* <button className="bg-transparent border-0 ">
          <Link
            href="/"
            className="bg-transparent text-cyanPrimary py-4 px-4 transition-all font-semibold border border-cyan-900 duration-300 rounded hover:bg-yellowPrimary hover:border-none hover:text-white"
          >
            সকল ক্যাটাগরি দেখুন
          </Link>{" "}
        </button> */}
      </div>

      <div className="grid lg:grid-cols-4 gap-4 pt-10 lg:pt-4">


        <Link href="/courses/primaryCourses" className=" ">
          <div className="bg-transparent rounded shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 bo">
            <div className="text-center">
             
              <h2 className="py-5 font-semibold ">প্রাইমারী চাকরী প্রস্ততি </h2>
            </div>
            
          </div>
        </Link>
        <Link href="/courses/primaryCourses" className=" ">
          <div className="bg-transparent rounded shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 bo">
            <div className="text-center">
             
              <h2 className="py-5 font-semibold ">ব্যাংক চাকরী প্রস্ততি </h2>
            </div>
            
          </div>
        </Link>
        <Link href="/courses/primaryCourses" className=" ">
          <div className="bg-transparent rounded shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 bo">
            <div className="text-center">
             
              <h2 className="py-5 font-semibold ">বিসিএস চাকরী প্রস্ততি </h2>
            </div>
           
          </div>
        </Link>
        <Link href="/courses/primaryCourses" className=" ">
          <div className="bg-transparent rounded shadow-lg border cursor-pointer  hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110 bo">
            <div className="text-center">
             
              <h2 className="py-5 font-semibold ">প্রাইমারী চাকরী প্রস্ততি </h2>
            </div>
            
          </div>
        </Link>





       
        {/* <Link href="/" className="relative  overflow-hidden  ">
          <div className="bg-white rounded shadow-lg">
            <div className="text-center">
              <div className="flex justify-center pt-5">
                <Image src={icon1} alt="icon" width={120} height={200} />
              </div>
              <h2 className="py-5 font-semibold ">প্রাইমারী চাকরী প্রস্ততি </h2>
            </div>
            <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-blue-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50 hover:rounded"></div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Category;
