"use client";
import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
} from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";
import toast from "react-hot-toast";

const AdminAllUsers = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.data?.data || [];
  const { role } = getUserInfo();
  const [makeAdmin] = useMakeAdminMutation();
  const handleMakeAdmin = async (userId) => {
    try {
      const response = await makeAdmin({ userId });
      if (response) {
        toast.success("admin Created Successfully");
      }

      // console.log(response);
    } catch (error) {
      toast.error("Error making user admin:", error);
    }
  };
  // const handleMakeAdmin = async (userId, userRole) => {
  //     try {
  //         // Assuming userRole is fetched from somewhere in your application
  //         // Check if the user's role is 'student' before making them an admin
  //         if (userRole === 'student') {
  //             const response = await makeAdmin({ userId });
  //             console.log(response,'from user make admin')
  //             if (response) {
  //                 toast.success("Admin Created Successfully");
  //             } else {
  //                 toast.error("Failed to create admin");
  //             }
  //         } else {
  //             toast.success("Cannot make non-student users admin");
  //         }
  //     } catch (error) {
  //         toast.error('Error making user admin:', error);
  //     }
  // };

  const getColorClass = (userRole) => {
    switch (userRole) {
      case "admin":
        return "text-blue-500"; // You can choose the color class you prefer for admins
      case "super_admin":
        return "text-green-500"; // You can choose the color class you prefer for super admins
      case "student":
        return "text-yellow-500"; // You can choose the color class you prefer for students
      default:
        return "text-gray-500"; // Default color for unknown roles
    }
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <div className="  py-4 ">
      <h1 className="text-2xl font-bold mb-4">Admin - All Users</h1>
      {users && users.length > 0 ? (
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
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Make Admin
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Created At
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
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
                    className={`border px-2 py-2 md:table-cell ${getColorClass(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </td>

                  <td className="">
                    {" "}
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2  rounded text-sm"
                    >
                      {" "}
                      Make Admin{" "}
                    </button>
                  </td>
                  <td className="border px-4 py-2 md:table-cell">
                    {user.createdAt}
                  </td>
                  <td className="border px-4 py-2 md:table-cell">
                    {user.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default AdminAllUsers;
