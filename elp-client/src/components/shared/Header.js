"use client";

import { useState, useEffect, useRef } from "react";
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
import { useGetAllSubcategoriesQuery } from "@/redux/api/subcategoryApi";
import {
  useGetAllCoursesQuery,
  useGetAllCoursesRoutineQuery,
} from "@/redux/api/courseApi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef();
 
  const [isSticky, setIsSticky] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isCoursesRoutineOpen, setIsCoursesRoutineOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { data: courseCategoryData } = useGetAllCategoriesQuery();
  const categoriesData = courseCategoryData?.categories;
  const { data: routines } = useGetAllCoursesRoutineQuery();
  // console.log(routines?.routines
  //   , 'fron header')
  const allRoutines = routines?.routines;
  const { data: courses } = useGetAllCoursesQuery();
  const { data: cart } = useGetAllCartsByUserQuery();
  const { data: subCategories } = useGetAllSubcategoriesQuery({
    category_id: selectedCategory,
  });

  const subCategoriesData = subCategories?.subcategories;

  const cartLength = cart?.carts;
  const { books } = useSelector((state) => state.cart);

  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { userId } = getUserInfo();

  const { data } = useGetSingleUserQuery(userId);

  const clickBtn = () =>{
    if(ref.current){
      clearTimeout(ref.current)
      ref.current = null
    }
     
  }
  // const handleMouseEnter = () => {
  //     clickBtn();
  //     isCoursesDropdownOpen(true)
  // }
  // const handleMouseLeave = () => {
  //     clickBtn();
  //     ref.current = setTimeout(()=>{
  //       isCoursesDropdownOpen(false)
  //     },200)
   
  // }

  // useEffect(()=>{
  //  return ()=> {
  //   clickBtn()
  //  }
  // },[])

  // logoute

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    setSelectedCategory(null); // Reset selected category when courses dropdown is toggled
    setSelectedSubCategory(null); // Reset selected subcategory when courses dropdown is toggled
  };

  const toggleCoursesRotine = () => {
    setIsCoursesRoutineOpen(!isCoursesRoutineOpen);
  };
  // Add subcategories state

  // Update the selectCategory function to reset selected subcategory
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null); // Reset selected subcategory
  };

  // Add selectSubCategory function
  const selectSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const openCoursesDropdown = () => {
    setIsCoursesDropdownOpen(true);
  };

  const closeCoursesDropdown = () => {
    setIsCoursesDropdownOpen(false);
    setSelectedCategory(null);
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
              alt="Easy Learning Platform"
              className="w-14 inline-block items-center"
            />
            <span className="dark:text-cyanPrimary hover:text-bluePrimary">
              ইজি লার্নিং প্লাটফর্ম
            </span>
          </Link>

          {/* nav for large device*/}

          <ul className="md:flex space-x-5 hidden">
            <Link
              href="/"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              হোম
            </Link>
            <div className="relative inline-block text-left">
              <button
                onClick={toggleCoursesDropdown}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className="dark:text-black hover:text-bluePrimary focus:outline-none font-bold"
              >
                কোর্সসমূহ <IoIosArrowDown className="inline-block text-xl" />
              </button>

              {isCoursesDropdownOpen && (
                <div className="absolute z-10 mt-2 w-40 left-0 text-white bg-bluePrimary divide-y divide-gray-100 rounded-lg shadow">
                  <ul className="py-2 pl-2">
                    {categoriesData?.map((category) => (
                      <li key={category?.id}>
                        <button
                          onClick={() => selectedCategory(category)}
                          className={`block py-1 hover:text-yellowPrimary focus:outline-none ${
                            selectedCategory === category ? "font-bold" : ""
                          }`}
                        >
                          {category?.title}
                        </button>

                        {/* Subcategories dropdown */}
                        {selectedCategory === category && (
                          <ul className="py-2 pl-2 bg-red-900">
                            sub category
                            {category?.subCategories?.map((subCategory) => (
                              <li key={subCategory?.id}>
                                {subCategory?.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/contact"
              className="block dark:text-black hover:text-bluePrimary font-bold"
            >
              যোগাযোগ
            </Link>
            <div className="">
              <button onClick={toggleCoursesRotine}>ক্লাস রুটিন</button>

              <ul>
                {allRoutines?.map((category) => (
                  <li key={category?._id}>
                    {category?.title}
                    <ul>
                      {category?.subCategories?.map((subCategory) => (
                        <li key={subCategory?._id}>
                          {subCategory.title}
                          <ul>
                            {subCategory?.courses.map((course) => (
                              <li key={course?._id}>
                                <a
                                  href={course?.syllabus}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {course?.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            {userLoggedIn && (
              <Link
                href="/profile"
                className="block dark:text-black hover:text-bluePrimary font-bold"
              >
                ড্যাসবোর্ড
              </Link>
            )}
          </ul>

          {/* btn for large device */}
          <div className="space-x-4 hidden lg:flex items-center">
            {/* <ToggleTheme /> */}

            <Link href="/cart" className="flex items-center">
              <IoCartOutline className="text-2xl font-bold" />{" "}
              {/* {userLoggedIn && (
                <sup className="text-md font-bold">{cartLength?.length}</sup>
              )} */}
              <sup className="text-md font-bold">{books?.length}</sup>
            </Link>

            {/* <!-- Dropdown menu --> */}

            {userLoggedIn ? (
              <>
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
                      alt="Profile"
                    />
                  </button>

                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute z-10 mt-4 w-44 left-[-130px] bg-gray-200 divide-y divide-gray-100 rounded-lg shadow `}
                  >
                    <ul className="py-4 pl-5 text-sm text-gray-700 dark:text-black">
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
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center text-cyanPrimary hover:text-bluePrimary font-bold"
              >
                লগইন/রেজিস্টার
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
      </nav>
    </header>
  );
};

export default Header;
