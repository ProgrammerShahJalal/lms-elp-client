'use client'
import { useGetAllUsersQuery, useMakeAdminMutation } from '@/redux/api/usersApi';
import React from 'react';
import toast from 'react-hot-toast';

const AdminAllUsers = () => {
    const { data, isLoading, isError } = useGetAllUsersQuery();
    const users = data?.data?.data || [];
    const [makeAdmin] = useMakeAdminMutation();
    const handleMakeAdmin = async (userId) => {
        try {
            const response = await makeAdmin({ userId });
            
            // console.log(response);

        } catch (error) {
            toast.error('Error making user admin:', error);
        }
    };

    if (isLoading) {
        return <p>Loading users...</p>;
    }

    if (isError) {
        return <p>Error fetching data...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin - All Users</h1>
            {users && users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Name</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Email</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Contact Number</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Role</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Make Admin</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Created At</th>
                                <th className="border bg-gray-100 px-4 py-2 hidden md:table-cell">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2 md:table-cell">{user.name}</td>
                                    <td className="border px-4 py-2 md:table-cell">{user.email}</td>
                                    <td className="border px-4 py-2 md:table-cell">{user.contact_no}</td>
                                    <td className="border px-4 py-2 md:table-cell">{user.role}</td>
                                    <td> <button onClick={() => handleMakeAdmin(user?._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" >  Make Admin </button></td>
                                    <td className="border px-4 py-2 md:table-cell">{user.createdAt}</td>
                                    <td className="border px-4 py-2 md:table-cell">{user.updatedAt}</td>
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
