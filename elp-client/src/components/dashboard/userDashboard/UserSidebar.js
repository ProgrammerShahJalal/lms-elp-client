import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { SiCoursera } from "react-icons/si";
import { FaBorderAll } from "react-icons/fa6";
import { MdRememberMe } from "react-icons/md";


const UserSidebar = () => {
    return (
        <div className="pt-10 flex items-center justify-center">
            <ul>
                <li>
                    <Link href="/profile" className=" transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><ImProfile fontSize={20} />  প্রোফাইল</Link>
                </li>
                <br />
                <li>
                    <Link href="/user/mycourses" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><SiCoursera fontSize={18} /> আমার  কোর্স</Link>
                </li>
                <br />
                <li>
                    <Link href="/user/userorder" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><FaBorderAll fontSize={18} /> অর্ডার হিসট্রি</Link>
                </li>
                <br />
                <li>
                    <Link href="/user/membershipplan" className="transition-all text-cyan-900  text-lg hover:bg-blue-900   px-6 py-2 hover:text-white rounded flex items-center gap-3 "><MdRememberMe fontSize={18} /> মেম্বারশিপ প্লান</Link>
                </li>

                <br /> <br />
                <li>
                    <Link href="/" className=" "> <Image src="https://i.ibb.co/q1gL2Zp/app-img.png" alt="app-img" width={200} height={40} />  </Link>
                </li>
            </ul>

        </div>
    )
}

export default UserSidebar;

