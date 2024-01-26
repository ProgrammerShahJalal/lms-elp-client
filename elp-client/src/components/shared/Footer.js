"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { CgFacebook } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  const [showNumber, setShowNumber] = useState(false);

  const handleMouseEnter = () => {
    setShowNumber(true);
  };

  const handleMouseLeave = () => {
    setShowNumber(false);
  };
  return (
    <div>
      <footer className="footer p-12  bg-cyanPrimary  text-white">
        <aside>
          <a
            href="/"
            className="text-xl font-semibold flex items-center space-x-2"
          >
            <Image
              src={logo}
              alt="logo"
              className="w-14 inline-block items-center"
            />
            <span className="text-white hover:text-bluePrimary text-xl">
              ইজি লার্নিং প্লাটফর্ম
            </span>
          </a>
          <p className="leading-loose  py-7">
            যেকোনো বয়সের শিক্ষার্থী, প্রফেশনাল ও ফ্রিল্যান্সারদের <br /> জন্য
            বহুব্রীহি হলো দেশের সেরা স্কিল ডেভেলপমেন্ট <br />
            সলিউশন। ইজি লার্নিং প্লাটফর্ম ইন্ডাস্ট্রির এক্সপার্টদের বানানো{" "}
            <br /> ক্যারিয়ার ট্র্যাক প্রোগ্রাম ও ফাউন্ডেশন কোর্সগুলো <br /> দেশে
            আপনার সফল ক্যারিয়ার নিশ্চিত করবে।
          </p>

          <div className="flex space-x-3">
            <p className="bg-gray-700 p-4  rounded transition-all duration-300  hover:bg-bluePrimary text-center cursor-pointer">
              <Link href="/">
                <span>
                  <CgFacebook className="text-white text-xl" />
                </span>
              </Link>
            </p>
            <p className="bg-gray-700 p-4  rounded transition-all duration-300  hover:bg-bluePrimary text-center cursor-pointer">
              <a
                href="https://www.linkedin.com/in/ProgrammerShahJalal"
                target="_blank"
              >
                <span>
                  <FaLinkedinIn className="text-white text-xl" />
                </span>
              </a>
            </p>
            <p
              className="bg-gray-700 p-4 rounded transition-all duration-300 hover:bg-bluePrimary text-center cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/">
                <span>
                  <FaWhatsapp className="text-white text-xl" />
                </span>
              </Link>
              {showNumber && (
                <span className="text-white">Help: +880 18 863 47350</span>
              )}
            </p>
            <p className="bg-gray-700 p-4  rounded transition-all duration-300  hover:bg-bluePrimary text-center cursor-pointer">
              <Link href="/">
                <span>
                  <IoLogoTwitter className="text-white text-xl" />
                </span>
              </Link>
            </p>
          </div>
        </aside>
        <nav>
          <header className="text-white text-lg font-bold pb-3">
            সার্ভিস সমূহ
          </header>
          <a className=" link-hover  link " href="/courses">
            <span className="flex  link ">
              <MdKeyboardDoubleArrowRight className="mr-2" /> সকল কোর্স
            </span>{" "}
          </a>
          <a href="/terms" className="link link-hover">
            টার্মস এন্ড কন্ডিশন
          </a>
          <a className="link link-hover" href="/policy">
            প্লেসমেন্ট সাপোর্ট
          </a>
          {/* <a className="link link-hover" href="/support">প্লেসমেন্ট সাপোর্ট</a> */}
          <a className="link link-hover" href="/privacy">
            প্রাইভেসি পলিসি
          </a>
        </nav>
        <nav>
          <header className=" text-white text-lg font-bold pb-3">
            প্রয়োজনীয় লিংক সমূহ
          </header>
          <a className="link link-hover" href="/about">
            আমাদের সম্পর্কে
          </a>
          <a className="link link-hover" href="/contact">
            যোগাযোগ
          </a>
          <a className="link link-hover" href="/books">
            আমাদের সব বই সমূহ
          </a>
          <a
            className="link link-hover"
            href="https://forms.gle/3vjsXVuQi2vUomHX7"
            target="_blank"
          >
            {" "}
            ফ্রী সেমিনারে অংশ নেন{" "}
          </a>
        </nav>
        <nav>
          <header className=" text-white text-lg font-bold pb-3">
            যোগাযোগ তথ্য
          </header>
          <a className="link link-hover">
            Dhaka Office: Dilkusha R/A, Motijheel, Dhaka-1223
          </a>
          <a className="link link-hover">
            Kushtia Office: Bandhpara, Khoksa Bazar, Khoksa, Kushtia-7020.
          </a>
          <a className="link link-hover">
            Rangpur Office: Shapla Chattar, Rangpur Sadar-5400
          </a>{" "}
          <a className="link link-hover">
            Rajshahi Office: Sonadighir mor, Rajshahi-6000.
          </a>
          <a className="link link-hover">
            Chattagram Office: Anderkilla, Chattagram-4000
          </a>
          <a className="link link-hover">elp: +880 18 863 47350</a>
          <a className="link link-hover">easyjobpreperation@gmail.com</a>
        </nav>
      </footer>
      <footer className="footer footer-center pb-5 bg-cyanPrimary text-white">
        <aside>
          <p>
            Copyright © 2024 - All right reserved Developed by Elite Developer
            Unity
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
