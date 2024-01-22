'use client'
import React from "react";
import banner from "../../../assets/images/banner.png";
import banner1 from "../../../assets/images/ban-img.png";
import banner2 from "../../../assets/images/ban-img2.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="banner bg-cyanPrimary py-10">
        <div className="hero-content flex-col lg:flex-row-reverse z-0">
          <Image src={banner2} className=" rounded-lg shadow-2xl z-0" width={500}  height={200} alt="hero img" />
          <div className="">
            <h1 className="text-5xl font-bold leading-relaxed text-cyanPrimary z-0">
              নিজের মত শিখুন, <br />
              আত্মবিশ্বাস গড়ুন!
            </h1>
            <p className="pt-6 pb-3  font-medium text-lg z-0">
              চাকরির জন্য নিজেকে প্রস্তুত করতে ইজি লার্নিং প্লাটফর্ম{" "}
              <span className="opacity-0">ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</span>
            </p>
            <p className="pb-12 font-medium text-lg z-0"> ক্যারিয়ার ট্র্যাক কোর্সগুলোই যথেষ্ট।</p>
            <Link href={'/courses'} className="bg-bluePrimary text-white py-3 px-6 transition-all duration-300 rounded hover:bg-cyanPrimary z-0">
              কোর্সগুলো দেখুন
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
