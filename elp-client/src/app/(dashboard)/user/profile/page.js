import DashNavbar from "@/components/dashboard/DashNavbar"
import UserContent from "@/components/dashboard/userDashboard/UserContent"
import UserSidebar from "@/components/dashboard/userDashboard/UserSidebar"



const UserProfile = () => {
  return (
    <div className="">
        <DashNavbar/>
        <div className=" grid grid-cols-2  bg-gray-200">
            <div className="bg-white h-screen w-56 mt-5 border border-gray-300 rounded ml-5 ">
                <UserSidebar/>
            </div>
            <div className="bg-white h-screen w-100 mt-5 rounded px-10 pt-10" style={{marginLeft:'-350px'}}>
             <UserContent/>
            </div>
        </div>
        

        
    </div>
  )
}

export default UserProfile