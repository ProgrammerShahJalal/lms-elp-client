"use client";
import UsersDetails from "@/components/dashboard/admin/UsersDetails";
import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
} from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import React, { useState } from "react";
import toast from "react-hot-toast";


const AdminAllUsers = () => {
  const ITEMS_PER_PAGE = 10;

  const { data, isLoading, isError } = useGetAllUsersQuery({ limit: 10000 });
  const users = data?.data?.data || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) =>
    user?.contact_no?.includes(searchTerm)
  );


// Calculate the total number of pages
const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

// Calculate the index range for the current page
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

// Extract the users for the current page
const currentUsers = filteredUsers.slice(startIndex, endIndex);



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  
  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-4">Admin - All Users</h1>
      <input
    
        type="number"
        className="border px-5 py-2 outline-none w-96 mb-5"
        placeholder="Search by Contact Number"
        onChange={handleSearchChange}
      />
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
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
              {currentUsers.map((user, index) => (
                <UsersDetails key={user?.id} index={index} user={user} />
              ))}
            </tbody>
          </table>

{/* Pagination controls */}
<div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-2 px-4 py-2 rounded-full ${
                    page === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

        </div>
      ) : (
        <p>No users available.</p>
      )}
      
    </div>
  );
};

export default AdminAllUsers;
