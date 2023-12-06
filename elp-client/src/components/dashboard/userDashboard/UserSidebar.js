import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";


const UserSidebar = () => {
  return (
    <div className="pt-10 flex items-center justify-center">
     <ul>
        <li>
            <Link href="/" className="bg-blue-500 transition-all hover:bg-blue-900 hover:font-bold px-6 py-2 text-white rounded flex items-center gap-3 "><FaHome fontSize={18} />  হোম</Link>
        </li>
        <br />
        <li>
            <Link href="/" className="bg-blue-500 transition-all hover:bg-blue-900 hover:font-bold px-6 py-2 text-white rounded flex items-center gap-3 "><FaHome fontSize={18} /> আমার  কোর্স</Link>
        </li>
        <br />
        <li>
            <Link href="/" className="bg-blue-500 transition-all hover:bg-blue-900 hover:font-bold px-6 py-2 text-white rounded flex items-center gap-3 "><FaHome fontSize={18} /> আমার  কোর্স</Link>
        </li>
        <br />
        <li>
            <Link href="/" className="bg-blue-500 transition-all hover:bg-blue-900 hover:font-bold px-6 py-2 text-white rounded flex items-center gap-3 "><FaHome fontSize={18} /> আমার  কোর্স</Link>
        </li>
        <br />
        <li>
            <Link href="/" className="bg-blue-500 transition-all hover:bg-blue-900 hover:font-bold px-6 py-2 text-white rounded flex items-center gap-3 "><FaHome fontSize={18} /> আমার  কোর্স</Link>
        </li>
        <br /> <br />
        <li>
            <Link href="/" className=" "> <Image src="https://i.ibb.co/q1gL2Zp/app-img.png" alt="app-img"  width={200} height={40}/>  </Link>
        </li>
     </ul>

    </div>
  )
}

export default UserSidebar