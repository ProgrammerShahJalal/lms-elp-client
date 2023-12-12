"use client";

import { useForm } from "react-hook-form";

const UserProfileEditPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
    <div className="bg-white rounded-lg py-6 border border-gray-200 px-10 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          type="text"
          placeholder="আপনার নাম"
          className="input input-bordered input-md w-full max-w-xs mr-5 outline-none mb-4"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="আপনার ইমেইল"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        <input
          {...register("phoneNumber")}
          type="number"
          placeholder="আপনার মোবাইল নাম্বার"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        <input
          {...register("profession")}
          type="text"
          placeholder="আপনার পেশা"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        <input
          {...register("address")}
          type="text"
          placeholder="আপনার ঠিকানা"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />
        <input
          {...register("bateofbirth")}
          type="date"
          placeholder="আপনার জন্ম তারিখ"
          className="input input-bordered input-md w-full max-w-xs mb-4 mr-5"
        />

        <select
          className="select select-bordered w-full max-w-xs mb-4 mr-5"
          {...register("gender")}
          placeholder="gender"
        >
          <option disabled selected>
            Male
          </option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs mb-4 mr-5"
          {...register("gender")}
        >
          <option  selected>
            Primary Job
          </option>
          <option >
            Primary Job
          </option>
          <option>NTRCA Job</option>
          <option>BCS Job</option>
          <option>Others</option>
        </select>
        <textarea
          {...register("desc")}
          placeholder="নিজের সম্পর্কে লিখুন"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs mb-4"
        ></textarea>
        <br />

        <input
          type="submit"
          value="সেভ করুন"
          className="flex items-center gap-3 bg-sky-900 text-white transition-all  hover:bg-blue-900 cursor-pointer px-5 py-2 rounded"
        />
      </form>
    </div>
    </>
  );
};

export default UserProfileEditPage;
