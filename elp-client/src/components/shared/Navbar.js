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
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = () => {

  // const ClickableDropdown = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleDropdown = () => {
  //     setIsOpen(!isOpen);
  //   };

  const { data: courseCategoryData } = useGetAllCategoriesQuery();
  const categoriesData = courseCategoryData?.categories;
  const { books } = useSelector((state) => state.cart);

  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { userId } = getUserInfo();

  const { data } = useGetSingleUserQuery(userId);


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

  const coursesLink = categoriesData?.map((item) => {
    return {
      sublink: `${item?.name}`, subpath: `/courses/category/${item?._id}`
    }
  })

  const commonRoutes = [
    { link: "হোম", path: "/" },
    {
      link: "কোর্সসমূহ",
      path: "courses",
      dropdown: coursesLink,
    },
    { link: "আমাদের সম্পর্কে", path: "about" },
    { link: "যোগাযোগ", path: "contact" },


  ];
  const navItems = userLoggedIn
    ? [...commonRoutes, { link: "প্রোফাইল", path: "profile" }]
    : commonRoutes;
  return (
    <header className="w-full bg-whitemd:bg-transparent sticky top-0 left-0 right-0 z-50 border-b  border-b-gray-200 shadow-lg">
      <nav
        className={`py-4   px-4 ${isSticky ? "  sticky top-0 left-0 right-0 border-b duration-300" : ""
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
                    className="relative inline-block  hover:text-bluePrimary font-bold cursor-pointer "
                    onClick={toggleCoursesDropdown}
                  //   onMouseEnter={openCoursesDropdown}
                  //   onMouseLeave={closeCoursesDropdown}
                  >
                    <span className="flex items-center ">
                      {" "}
                      {link} <IoIosArrowDown />{" "}
                    </span>
                    <div
                      className={`absolute ${isCoursesDropdownOpen ? "block" : "hidden"
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


            <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div id="dropdownHover" className="z-10 hidden bg-red-900 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>




            {userLoggedIn ? (
              <>
                <p>{data?.name}</p>
                <Link href="/cart" className="flex items-center"><IoCartOutline className="text-2xl font-bold" /> <sup className="text-md font-bold">{books?.length}</sup></Link>
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
          className={`space-y-4  mt-16 py-7 bg-bluePrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0 text-center" : "hidden"
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
                    className={`absolute ${isCoursesDropdownOpen ? "block" : "hidden"
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
