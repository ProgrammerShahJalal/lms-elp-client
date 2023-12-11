'use client'

import { useState } from "react";
import { VscEye,VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import Link from "next/link";

const LoginPage = () => {
  
  const { register, handleSubmit } = useForm();
  

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const onSubmit = (data) => console.log(data);
  return (
    <div className="bg-white border rounded shadow-lg max-w-md mx-auto py-5 my-10 z-0">
      <div>
         <h2 className="text-lg font-bold text-center pb-10 pt-5 text-cyanPrimary">ইজি লার্নিং প্লাটফর্মে আপনাকে স্বাগতম।</h2>
 
         <div className="mb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          
          <div className="flex justify-center">
          <input type="number" {...register("contact_no")}  placeholder="আপনার মোবাইল নাম্বার / ইমেইল" className="border py-4 px-3 rounded outline-none hover:border-gray-500  w-80  bg-gray-200" required />
          </div>
          <div className="flex justify-center">
      <div className="relative w-80">
        <input
          type={showPassword ? 'text' : 'password'} {...register("password")}
          placeholder="পাসওয়ার্ড লিখুন"
          className="border py-4 px-3 rounded outline-none hover:border-gray-500 w-full bg-gray-200 pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-4 py-2   rounded"
        >
          {showPassword ? <VscEyeClosed /> : <VscEye />}
        </button>
      </div>
    </div>
          
          <input type="submit" value="লগইন করুন"   className="bg-bluePrimary text-white py-4 px-3 transition-all duration-300 rounded hover:bg-cyanPrimary w-80 ml-16" />
          
        
          </form>

          <div className="py-5 text-center">
            <p> আপনার এক্যাউন্ট নাই ?   <Link href="/register" className="text-bold text-bluePrimary text-lg hover:underline">রেজিস্টার করুন</Link></p>
          </div>
         </div>
      </div>
    </div>
  );
}

export default LoginPage