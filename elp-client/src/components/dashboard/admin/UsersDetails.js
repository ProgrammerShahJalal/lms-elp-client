'use client'

import { useDeleteUserMutation, useMakeAdminMutation } from "@/redux/api/usersApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersDetails = ({ user, index }) => {
  const dateObject = new Date(user?.createdAt);
  const localData = dateObject.toLocaleDateString();
  const [makeAdmin] = useMakeAdminMutation();
  const [deleteUser] = useDeleteUserMutation()

  const handleMakeAdmin = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to make this user an admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make admin!"
      });

      if (result.isConfirmed) {
        const response = await makeAdmin({ userId });

        if (response) {
          Swal.fire({
            title: "Admin Created!",
            text: "The user has been made an admin successfully.",
            icon: "success"
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while making the user an admin.",
        icon: "error"
      });
    }
  };


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "To delete the user, click 'Delete'; otherwise, click 'Cancel.'",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed deletion
        const res = await deleteUser(id);
        // console.log(res?.data)

        if (res?.data?._id === id) {
          // Item deleted successfully
          Swal.fire({
            title: "Deleted!",
            text: "user has been deleted.",
            icon: "success",
          });
        } else {
          // Something went wrong with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong with deletion.",
            icon: "error",
          });
        }
      }
    } catch (err) {
      // Handle any errors that occur during the process
      toast.error(err.message);
    }
  };
  
  const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin');

  const getColorClass = (userRole) => {
    switch (userRole) {
      case "admin":
        return "text-blue-500";
      case "super_admin":
        return "text-green-500"; 
      case "student":
        return "text-yellow-500"; 
      default:
        return "text-gray-500"; 
    }
  };
  return (
    <tr>
      <td className="border px-4  py-2 md:table-cell">
        {user.name}
      </td>
      <td className="border px-2  py-2 md:table-cell">
        {user.email}
      </td>
      <td className="border px-2  py-2 md:table-cell">
        {user.contact_no}
      </td>
      
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
          className={`bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 rounded text-sm px-1 mx-2 ${isAdmin ? 'disabled:opacity-50 cursor-not-allowed bg-gray-400 text-black' : ''}`}
          disabled={isAdmin}
        >
          Make Admin
        </button>
      </td>
      <td className="border px-4 py-2 md:table-cell">
        {localData}
      </td>
      <td className="border px-4 py-2 md:table-cell">
        <button className="bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => handleDelete(user?.id)}>  Delete</button>
      </td>
    </tr>
  );
};

export default UsersDetails;