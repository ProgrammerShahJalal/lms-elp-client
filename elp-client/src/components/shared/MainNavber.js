import Link from 'next/link'
import React from 'react'

const MainNavber = () => {
  return (
    <div className="bg-white border-b border-b-gray-300 sticky top-0 z-10">
<div className="navbar ">
  <div className="navbar-start">
  <Link href="/" className="text-xl text-cyan-900">ইজি লার্নিং প্লাটফর্ম</Link>
   
  </div>
  <div className="navbar-center hidden lg:flex">
          <ul className=''>
            <li className='inline-block px-2'><Link href="/">হোম</Link></li>
            <li className='inline-block px-2'><Link href="/">কোর্স</Link></li>
            <li className='inline-block px-2'><Link href="/">যোগাযোগ</Link></li>
            
     
          </ul>
  </div>
  <div className="navbar-end">
    <Link href="/login" className="flex items-center gap-3 bg-blue-600 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded">
           লগইন করুন
    </Link>
  </div>
</div>

    </div>
  )
}

export default MainNavber