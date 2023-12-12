'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const closeSidebar = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">eশিখন</a>
                    </div>
                    <div className="flex-none">

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button
                    className="block lg:hidden px-2 py-1 "
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
                <div
                    className={`bg-gray-800 h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="p-4 flex justify-between items-center">
                        <div className="text-white text-xl font-bold">Sidebar</div>
                        {isOpen && (
                            <button className="text-white" onClick={closeSidebar}>
                                ✕
                            </button>
                        )}
                    </div>
                    <ul className="py-2 text-white">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Home</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer"><Link href={'/admin/addquiz'}>
                            কুইজ যোগ করুন</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                            <Link href={'/admin/addvideo'}>ভিডিও যোগ করুন</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Contact</li>
                    </ul>
                </div>
            </div >
        </>
    );
};

export default AdminDashboard;