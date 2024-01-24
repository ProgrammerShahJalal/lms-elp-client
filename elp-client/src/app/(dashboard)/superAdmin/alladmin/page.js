"use client"

import AdminPermission from "@/components/dashboard/admin/AdminPermission";
import { useAdminPermissionMutation, useGetAllUsersQuery } from "@/redux/api/usersApi";

export const adminPermissions = [
  "user",
  "course",
  "subscription",
  "course_video",
  "exam",
  "book",
  "order_status",
  "order",
]

const AllAdminPage = () => {
    const { data, isLoading, isError } = useGetAllUsersQuery({
      role:"admin"
    });
  const adminUsers = data?.data?.data || [];

 
  


  

 

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }
    return (
        <div className="  py-4 ">
      <h1 className="text-2xl font-bold mb-4">All Admins Here</h1>
      {adminUsers && adminUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-300">
            <thead>
              <tr>
                <th className="border bg-gray-100  px-4 py-2 hidden md:table-cell">
                  Name
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Email
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Contact Number
                </th>
                <th className="border bg-gray-100  py-2 hidden md:table-cell">
                  Role
                </th>
                {/* <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Make Admin
                </th> */}
                {/* <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  User registered
                </th> */}
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {adminUsers?.map(user => (
         <tr key={user?.id}>
         <td className="border px-4  py-2 md:table-cell">
           {user.name}
         </td>
         <td className="border px-2  py-2 md:table-cell">
           {user.email}
         </td>
         <td className="border px-2  py-2 md:table-cell">
           {user.contact_no}
         </td>
         {/* <td className="border px-2 py-2 md:table-cell">{user.role}</td> */}
         <td
           className=""
         >
           {user.role}
         </td>
 
         {/* <td className="">
           {" "}
           <button
       
       className=""
     >
       Make Admin
     </button>
         </td> */}
         {/* <td className="border px-4 py-2 md:table-cell">
           {localData}
         </td> */}
         <td className="border  py-2 md:table-cell">
          {adminPermissions?.map((permission)=><AdminPermission key={permission} permission={permission} userId= {user?.id}/>)}
         {/* <button className="bg-red-500 text-white py-1 px-2 rounded-md"
                     >  Delete</button> */}
         </td>
       </tr>
      ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No admin available.</p>
      )}
    </div>
    );
};

export default AllAdminPage;