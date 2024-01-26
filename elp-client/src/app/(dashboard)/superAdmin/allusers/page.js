"use client";
import UsersDetails from "@/components/dashboard/admin/UsersDetails";
import {
  useGetAllUsersQuery,
  useMakeAdminMutation,
} from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import React, { useState } from "react";
import toast from "react-hot-toast";

// const AdminAllUsers = () => {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };
//   const { data, isLoading, isError } = useGetAllUsersQuery({ page, userPerPage: limit });
//   const users = data?.data?.data || [];
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredUsers = users.filter((user) =>
//     user?.contact_no?.includes(searchTerm)
//   );

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const totalPages = Math.ceil(data?.data?.meta?.total / limit);

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }




//   if (isLoading) {
//     return <p>Loading users...</p>;
//   }

//   if (isError) {
//     return <p>Error fetching data...</p>;
//   }

//   return (
//     <div className="  py-4 ">

//       <h1 className="text-2xl font-bold mb-4">Admin - All Users</h1>
//       <input
//         type="number"
//         className="border px-5 py-2 outline-none rounded mb-5"
//         placeholder="Search by Contact Number"
//         onChange={handleSearchChange}
//       />
//       {filteredUsers && filteredUsers.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full  border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border bg-gray-100  px-4 py-2 hidden md:table-cell">
//                   Name
//                 </th>
//                 <th className="border bg-gray-100  py-2 hidden md:table-cell">
//                   Email
//                 </th>
//                 <th className="border bg-gray-100  py-2 hidden md:table-cell">
//                   Contact Number
//                 </th>
//                 <th className="border bg-gray-100  py-2 hidden md:table-cell">
//                   Role
//                 </th>
//                 <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
//                   Make Admin
//                 </th>
//                 <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
//                   User registered
//                 </th>
//                 <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers?.map((user, index) => (<UsersDetails key={user?.id} index={index} user={user} />

//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No users available.</p>
//       )}
//       {/* <div className="flex justify-center space-x-2 mt-4">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={users.length < limit}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Next
//         </button>
//       </div> */}
//       <div className="flex justify-center space-x-2 mt-4">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Previous
//         </button>
//         {pageNumbers.map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={`${pageNumber === page
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300 text-black"
//               } px-4 py-2 rounded-md`}
//           >
//             {pageNumber}
//           </button>
//         ))}

//         {pageNumbers.length > 5 && (
//           <>
//             <span className="px-2">...</span>
//             <button
//               onClick={() => handlePageChange(page + 1)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               {page + 1}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={users.length < limit}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminAllUsers;
const AdminAllUsers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const { data, isLoading, isError } = useGetAllUsersQuery({ page, userPerPage: limit });
  const users = data?.data?.data || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.contact_no?.includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const totalPages = Math.ceil(data?.data?.meta?.total / limit);
  const calculateDisplayPages = () => {
    const middleIndex = Math.floor(limit / 2);
    const pagesToShow =
      totalPages <= limit
        ? pageNumbers
        : pageNumbers.slice(
          Math.max(0, page - middleIndex),
          Math.min(pageNumbers.length, page + middleIndex + (limit % 2))
        );
    return pagesToShow;
  };


  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const displayPageNumbers = calculateDisplayPages();

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
        className="border px-5 py-2 outline-none rounded mb-5"
        placeholder="Search by Contact Number"
        onChange={handleSearchChange}
      />
      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            {/* ... (your table header) */}
            <tbody>
              {filteredUsers?.map((user, index) => (
                <UsersDetails key={user?.id} index={index} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users available.</p>
      )}
      <div className="flex justify-center space-x-2 my-12">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Previous
        </button>
        {displayPageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`${pageNumber === page
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
              } px-4 py-2 rounded-md`}
          >
            {pageNumber}
          </button>
        ))}
        {pageNumbers.length > limit && (
          <>
            <span className="px-2">...</span>
            <button
              onClick={() => handlePageChange(pageNumbers[limit])}
              className={`${pageNumbers[limit] === page
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
                } px-4 py-2 rounded-md`}
            >
              {pageNumbers[limit]}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={users.length < limit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAllUsers;
