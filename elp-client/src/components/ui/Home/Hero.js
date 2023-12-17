'use client'
import React from "react";
import banner from "../../../assets/images/banner.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="banner bg-cyanPrimary ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <Image src={banner} className="max-w-sm rounded-lg shadow-2xl" alt="hero img" />
          <div className="">
            <h1 className="text-5xl font-bold leading-relaxed text-cyanPrimary">
              নিজের মত শিখুন, <br />
              আত্মবিশ্বাস গড়ুন!
            </h1>
            <p className="pt-6 pb-3  font-medium text-lg">
              চাকরির জন্য নিজেকে প্রস্তুত করতে ইজি লার্নিং প্লাটফর্ম{" "}
              <span className="opacity-0">ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</span>
            </p>
            <p className="pb-6 font-medium text-lg"> ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</p>
            <Link href={'/courses'} className="bg-bluePrimary text-white py-3 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary">
              কোর্সগুলো দেখুন
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
