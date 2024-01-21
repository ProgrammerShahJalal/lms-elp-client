"use client";
import UsersDetails from "@/components/dashboard/admin/UsersDetails";
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
                  User registered
                </th>
                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (<UsersDetails key={user?.id} user={user}/>
               
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
