"use client";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "../shared/ToggleTheme";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storage";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";

const DashNavbar = () => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  // logout

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className="bg-white border-b border-b-gray-300 sticky top-0 z-10">
      <div className="navbar px-5">
        <div className="navbar-start ">
          <Link href="/" className="text-xl text-cyan-900">
            ইজি লার্নিং প্লাটফর্ম
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul>
            <li>
              <Link href="/" className="text-xl font-medium">
                কোর্স সমহ
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ToggleTheme />
          {userLoggedIn ? (
            <div
              className="flex items-center gap-3 bg-blue-600 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
              onClick={logout}
            >
              <FiLogOut fontSize={20} />
              <button className="text-xl ">লগ আউট</button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-blue-600 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded">
              <FiLogOut fontSize={20} />
              <Link href="/login" className="text-xl ">
                লগইন
              </Link>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
