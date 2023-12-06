import Link from "next/link";
import { FiLogOut } from "react-icons/fi";


const DashNavbar = () => {
  return (
    <div className="bg-white border-b border-b-gray-300">
    <div className="navbar px-5">
  <div className="navbar-start ">
    <Link href="/" className="text-xl">লার্নিং প্লাটফর্ম</Link>
    
  </div>
  <div className="navbar-center hidden lg:flex">
     <ul>
      <li>
        <Link href="/" className="text-xl font-medium">কোর্স সমহ</Link>
      </li>
     </ul>
  </div>
  <div className="navbar-end">
    <div className="flex items-center gap-3 bg-blue-600 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded">
    <FiLogOut fontSize={20} />
    <button className="text-xl ">লগ আউট</button>
    
    </div>

  </div>
</div>
    
    
    </div>
  )
}

export default DashNavbar