"use client";

import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import ToggleTheme from "./ToggleTheme";
import { getUserInfo, isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const {role} = getUserInfo()

  // logout

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
  };

  const openCoursesDropdown = () => {
    setIsCoursesDropdownOpen(true);
  };

  const closeCoursesDropdown = () => {
    setIsCoursesDropdownOpen(false);
  };

  // set toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.addEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const commonRoutes = [
    { link: "হোম", path: "home" },
    {
      link: "কোর্সসমূহ",
      path: "courses",
      dropdown: [
        { sublink: "প্রাইমারী চাকুরী কোর্স ", subpath: "course1" },
        { sublink: "ব্যাংক চাকুরি কোর্স ", subpath: "course2" },
        // Add more courses as needed
      ],
    },
    { link: "আমাদের সম্পর্কে", path: "about" },
    { link: "যোগাযোগ", path: "contact" },
    { link: "FAQ", path: "faq" },
    
  ];
  const navItems = userLoggedIn
  ? [...commonRoutes, { link: "প্রোফাইল", path: "profile" }]
  : commonRoutes;
  return (
    <header className="w-full bg-white md:bg-transparent sticky top-0 left-0 right-0 z-10 border-b border-b-gray-200 shadow-lg">
      <nav
        className={`py-4  px-4 ${
          isSticky ? " bg-white sticky top-0 left-0 right-0 border-b duration-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <Link href="/" className="text-lg font-semibold flex items-center space-x-2">
            <Image src={logo} alt="logo" className="w-14 inline-block items-center" />
            <span className="text-cyanPrimary hover:text-bluePrimary">ইজি লার্নিং প্লাটফর্ম</span>
          </Link>

          {/* nav for large device*/}
          

          <ul className="md:flex space-x-5 hidden">
            {navItems.map(({ link, path, dropdown }) => (
              <div key={path}>
                {dropdown ? (
                  <div
                    className="relative inline-block  hover:text-bluePrimary font-bold cursor-pointer"
                    onClick={toggleCoursesDropdown}
                    //   onMouseEnter={openCoursesDropdown}
                    //   onMouseLeave={closeCoursesDropdown}
                  >
                    <span className="flex items-center ">
                      {" "}
                      {link} <IoIosArrowDown />{" "}
                    </span>
                    <div
                      className={`absolute ${
                        isCoursesDropdownOpen ? "block" : "hidden"
                      } space-y-2 text-white bg-bluePrimary left-0 mt-5 text-left cursor-pointer w-48 py-5 `}
                    >
                      {dropdown.map(({ sublink, subpath }) => (
                        <Link
                          href={subpath}
                          key={subpath}
                          className="block px-3  hover:text-cyanPrimary cursor-pointer "
                        >
                          {sublink}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={path}
                    key={path}
                    className="block text-black hover:text-bluePrimary font-bold"
                  >
                    {link}
                  </Link>
                )}
              </div>
            ))}
          </ul>

          {/* btn for large device */}
          <div className="space-x-2 hidden lg:flex items-center">
            <ToggleTheme />
            {userLoggedIn ? (
              <>
              <p>{role}</p>
              <button
                onClick={logout}
                className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
              >
                লগআউট
              </button>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center text-cyanPrimary hover:text-bluePrimary font-bold"
              >
                লগইন 
              </Link>
            )}
          </div>

          {/* menu btn for only mobile devices */}
          <div className="md:hidden">
            <button
              className=" text-bluePrimary  focus:outline-none focus:text-gray-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaXmark className="h-6 w-6 " /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* nav items for mobile devices */}
        <div
          className={`space-y-4  mt-16 py-7 bg-bluePrimary ${
            isMenuOpen ? "block fixed top-0 right-0 left-0 text-center" : "hidden"
          }`}
        >
          {navItems.map(({ link, path, dropdown }) => (
            <div key={path}>
              {dropdown ? (
                <div
                  className="relative inline-block  hover:text-bluePrimary font-bold cursor-pointer text-white"
                  onClick={toggleCoursesDropdown}
                  //   onMouseEnter={openCoursesDropdown}
                  //   onMouseLeave={closeCoursesDropdown}
                >
                  <span className="flex items-center text-white">
                    {" "}
                    {link} <IoIosArrowDown />{" "}
                  </span>
                  <div
                    className={`absolute ${
                      isCoursesDropdownOpen ? "block" : "hidden"
                    } space-y-2 text-bluePrimary bg-white left-24  text-left cursor-pointer w-24 `}
                  >
                    {dropdown.map(({ sublink, subpath }) => (
                      <Link
                        href={subpath}
                        key={subpath}
                        className="block px-3  hover:text-white cursor-pointer"
                      >
                        {sublink}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={path}
                  key={path}
                  className="block text-white hover:text-bluePrimary font-bold"
                >
                  {link}
                </Link>
              )}
            </div>
          ))}
          <div className=" ">
            <a href="/login" className=" text-white hover:text-bluePrimary font-bold">
              লগইন করুন
            </a>
            <br />
            <Link
              href="/register"
              className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded ml-[-20px] hover:bg-cyanPrimary font-bold"
            >
              রেজিস্টার
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
