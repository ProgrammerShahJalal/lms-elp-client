import DashNavbar from "@/components/dashboard/DashNavbar"
import Link from "next/link"


const UserProfileEditPage = () => {
  return (
    <div>
    <DashNavbar/>
    <Link href='/user/profile'>go profile</Link>
    </div>
  )
}

export default UserProfileEditPage