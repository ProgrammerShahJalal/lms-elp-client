import React from 'react'

const Testing = () => {
  return (
    <div>

      {/* courses 
      {/* 
          <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.title}
            <ul>
              {category.subCategories.map((subCategory) => (
                <li key={subCategory._id}>
                  {subCategory.title}
                  <ul>
                    {subCategory.courses.map((course) => (
                      <li key={course._id}>
                        <a href={course.syllabus} target="_blank" rel="noopener noreferrer">
                          {course.title}
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
           {!showPDFModal && (
          <button onClick={openPDFModal} className="text-bluePrimary cursor-pointer">
            বইটি একটু পড়ুন
          </button>
        )}
             "https://drive.google.com/file/d/178gMk281mQtMJrVHtR7nytcphA_uoIDk/preview"
            </div>
      <PDFViewerModal isOpen={showPDFModal} onClose={closePDFModal} pdfSrc="https://drive.google.com/file/d/178gMk281mQtMJrVHtR7nytcphA_uoIDk/preview" />
          
          */}
      {/* nav items for mobile devices */}
        <div
          className={`space-y-4  mt-16 py-7 bg-bluePrimary ${
            isMenuOpen
              ? "block fixed top-0 right-0 left-0 text-center"
              : "hidden"
          }`}
        >
          {/* <ToggleTheme /> */}
          {/* {navItems.map(({ link, path, dropdown }) => (
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
          ))} */}
          <ul>
            <Link
              href="/"
              className="block text-decoration-none text-gray-500 hover:bg-gray-200 hover:text-orangePrimary py-1  rounded"
            >
              Home
            </Link>
          </ul>

          <div className="flex justify-center">
            <Link href="/cart" className="flex items-center">
              <IoCartOutline className="text-2xl font-bold text-white" />{" "}
              <sup className="text-md font-bold text-white">
                {books?.length}
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
                লগইন/রেজিস্টার
              </Link>
            )}
          </div>
        </div>
      
      
      
       {/* <p>বইটি পড়ুন  <iframe src={item?.pdf_link} width="640" height="480" allow="autoplay"></iframe></p> */}
            {/* <iframe src={item?.pdf_link} width="100%" height="600px" frameborder="0"></iframe> */}
            {/* <iframe src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${item?.pdf_link}`} width="100%" height="600px" frameborder="0"></iframe>
            <iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/file/d/1pynwq8cL-xYy78OEPUb9KuQtQIq3OdmM/view" width="100%" height="600px" frameborder="0"></iframe> */}
             {/* <iframe src="https://drive.google.com/file/d/1PCWbhKm2n6FCSSPhvHt3eqE7MSiyAm39/preview" width="640" height="480" allow="autoplay"></iframe> */}
        {/* <iframe src="https://drive.google.com/file/d/1pynwq8cL-xYy78OEPUb9KuQtQIq3OdmM/preview" width="640" height="480" allow="autoplay"></iframe> */}
        {/* <iframe src={item?.pdf_link} width="640" height="480" allow="autoplay"></iframe> */}
      
      
      
   

{/* <div className="grid grid-cols-3 gap-4">
  <div className="mb-4">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
    </div>
  </div>
  <div className="mb-4">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-purple-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
    </div>
  </div>
  <div className="mb-4">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-green-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-70"></div>
    </div>
  </div>
</div>
<div className="grid grid-cols-3 gap-4">
  <div className="mb-4 md:mb-0">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-red-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-30"></div>
    </div>
  </div>
  <div className="mb-4 md:mb-0">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-40"></div>
    </div>
  </div>
  <div className="mb-4 md:mb-0">
    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
      <img
        src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
        className="max-w-xs"
        alt="Louvre" />
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-blue-400 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-60"></div>
    </div>
  </div>
</div> */}


{/* // <div className="pt-10 flex items-center justify-center">
        //     <ul>
        //         <li>
        //             <Link href="/profile" className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><ImProfile fontSize={20} />  প্রোফাইল</Link>
        //         </li>
        //         <br />
        //         <li>
        //             <Link href="/user/mycourses" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><SiCoursera fontSize={18} /> আমার  কোর্স</Link>
        //         </li>
        //         <br />
        //         <li>
        //             <Link href="/user/userorder" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><FaBorderAll fontSize={18} /> অর্ডার হিসট্রি</Link>
        //         </li>
        //         <br />
        //         <li>
        //             <Link href="/user/membershipplan" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান</Link>
        //         </li>

        //         <br /> <br />
        //         <li>
        //             <Link href="/" className=" "> <Image src="https://i.ibb.co/q1gL2Zp/app-img.png" alt="app-img" width={200} height={40} />  </Link>
        //         </li>
        //     </ul>

        // </div> */}

    </div>
  )
}

export default Testing