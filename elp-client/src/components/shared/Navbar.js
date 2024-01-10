"use client";

import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import ToggleTheme from "./ToggleTheme";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { authKey } from "@/constants/storage";
import { useRouter } from "next/navigation";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.png";
import {
  useGetAllCartsByUserQuery,
  useGetAllCartsQuery,
} from "@/redux/api/cartApi";

const Navbar = () => {
  // const ClickableDropdown = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleDropdown = () => {
  //     setIsOpen(!isOpen);
  //   };

  const { data: courseCategoryData } = useGetAllCategoriesQuery();
  const categoriesData = courseCategoryData?.categories;
  const { data: cart } = useGetAllCartsByUserQuery();
  // console.log(cart?.carts, 'from navbaer');
  const cartLength = cart?.carts;
  // const { books } = useSelector((state) => state.cart);

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
      sublink: `${item?.title}`,
      subpath: `/courses/category/${item?._id}`,
    };
  });

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
    ? [...commonRoutes, { link: "ড্যাসবোর্ড", path: "profile" }]
    : commonRoutes;
  return (
    <header className="w-full bg-white sticky top-0 left-0 right-0 z-10 border-b border-b-gray-200 shadow-lg">
      <nav
        className={`py-4  px-4 ${
          isSticky
            ? " bg-white sticky top-0 left-0 right-0 border-b duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            href="/"
            className="text-lg font-semibold flex items-center space-x-2"
          >
            <Image
              src={logo}
              alt="logo"
              className="w-14 inline-block items-center"
            />
            <span className="dark:text-cyanPrimary hover:text-bluePrimary">
              ইজি লার্নিং প্লাটফর্ম
            </span>
          </Link>

          {/* nav for large device*/}

          <ul className="md:flex space-x-5 hidden">
            {navItems.map(({ link, path, dropdown }) => (
              <li key={path}>
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
                          className="block px-3   hover:text-cyanPrimary cursor-pointer "
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
                    className="block dark:text-black hover:text-bluePrimary font-bold"
                  >
                    {link}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* btn for large device */}
          <div className="space-x-4 hidden lg:flex items-center">
            <ToggleTheme />

            <Link href="/cart" className="flex items-center">
              <IoCartOutline className="text-2xl font-bold" />{" "}
              {userLoggedIn && <sup className="text-md font-bold">{cartLength?.length}</sup>}
            </Link>

            {/* <!-- Dropdown menu --> */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={toggleDropdown}
                id="dropdownHoverButton"
                className=" bg-gray-200 rounded-full p-2"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <Image
                  src={avatar}
                  width={20}
                  height={50}
                  className="rounded "
                />
              </button>

              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute z-10 mt-4 w-44 left-[-130px] bg-gray-200 divide-y divide-gray-100 rounded-lg shadow `}
              >
                <ul className="py-4 px-10 text-sm text-gray-700 dark:text-gray-200">
                  {userLoggedIn ? (
                    <>
                      <li>
                        <Link
                          href="/"
                          className="block  py-2 hover:bg-gray-100  "
                        >
                          <p className="text-lg font-bold">{data?.name}</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="block  py-2 text-lg hover:bg-gray-100 "
                        >
                          প্রোফাইল
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={logout}
                          className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"
                        >
                          লগআউট
                        </button>
                      </li>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="hidden lg:flex items-center text-cyanPrimary hover:text-bluePrimary font-bold"
                    >
                      লগইন
                    </Link>
                  )}
                </ul>
              </div>
            </div>
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
            isMenuOpen
              ? "block fixed top-0 right-0 left-0 text-center"
              : "hidden"
          }`}
        >
          <ToggleTheme />
          {navItems.map(({ link, path, dropdown }) => (
            <div key={path}>
              {dropdown ? (
                <div
                  className="relative inline-block  hover:text-yellowPrimary font-bold cursor-pointer text-white"
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
          <div className="flex justify-center">
            <Link href="/cart" className="flex items-center">
              <IoCartOutline className="text-2xl font-bold text-white" />{" "}
              <sup className="text-md font-bold text-white">
                {cartLength?.length}
              </sup>
            </Link>
          </div>
          <div className=" ">
            {userLoggedIn ? (
              <>
                <p className="font-bold text-lg text-white">{data?.name}</p>

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
                className="hidden lg:flex items-center text-white hover:text-white font-bold"
              >
                লগইন
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
