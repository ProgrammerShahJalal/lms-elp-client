"use client";

import AdminPermissions from "@/components/dashboard/admin/AdminPermission";
import {
  useGetAllUsersQuery,
} from "@/redux/api/usersApi";
import { useState } from "react";


const ITEMS_PER_PAGE = 10;


export const adminPermissions = [
  "user",
  "course",
  "subscription",
  "course_video",
  "exam",
  "book",
  "order_status",
  "order",
];

const AllAdminPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchAdmins,
  } = useGetAllUsersQuery({
    role: "admin", limit: 100
  });
  const adminUsers = data?.data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = adminUsers.filter((user) =>
    user?.contact_no?.includes(searchTerm)
  );


  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;


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
    <div className="  py-4 ">
      <h1 className="text-2xl font-bold mb-4">All Admins Here</h1>
      <input
        type="number"
        className="border px-5 py-2 outline-none w-96 rounded mb-5"
        placeholder="Search by Contact Number"
        onChange={handleSearchChange}
      />
      {filteredUsers && filteredUsers.length > 0 ? (
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

                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers?.map((user) => (
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

                  <td className="border  py-2 md:table-cell">
                    <AdminPermissions
                      user={user}
                      refetchAdmins={refetchAdmins}
                    />
                  </td>
                </tr>
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
        <p>No admin available.</p>
      )}
    </div>
  );
};

export default AllAdminPage;
