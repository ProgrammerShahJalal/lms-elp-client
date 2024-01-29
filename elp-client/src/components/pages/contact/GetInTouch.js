import { PiSmiley, PiStudentBold } from "react-icons/pi";
import { TbPhoneCall, TbWorld } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import ContactForm from "./ContactForm";
import Link from "next/link";

const GetInTouch = () => {
  return (
    <div className="px-14 py-20">
      <div className="text-center space-y-3 pb-20">
        <h5 className="text-bluePrimary uppercase">NEED HELP?</h5>
        <h2 className=" font-bold text-2xl">Get In Touch With us</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="grid grid-cols-2 gap-7">
          <Link href="/">
            <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
              <div className="space-y-2 text-center">
                <div className="flex justify-center items-center ">
                  <TbWorld className="text-4xl text-bluePrimary rounded-full bg-blue-200 p-2" />
                </div>

                <h2 className="font-bold text-xl">Our Website</h2>
                <p className="">Easy Learning Platform</p>
              </div>
            </div>
          </Link>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <TbPhoneCall className="text-4xl text-bluePrimary rounded-full bg-blue-200 p-2" />
              </div>

              <h2 className="font-bold text-xl">Call Us On</h2>
              <p className="">+880 18 863 47350</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <MdOutlineMailOutline className="text-4xl " />
              </div>

              <h2 className="font-bold text-xl">Email Us</h2>
              <p className="">easyjobpreperation@gmail.com</p>
            </div>
          </div>
          <div className="bg-white rounded shadow-md  h-48 pt-10 cursor-pointer hover:shadow-xl hover:bg-yellowPrimary hover:text-white transition-all transform duration-300 delay-200 hover:-translate-y-1 hover:scale-110">
            <div className="space-y-2 text-center">
              <div className="flex justify-center items-center">
                <LuMapPin className="text-4xl " />
              </div>

              <h2 className="font-bold text-xl">Our Location</h2>
              <p className="">
                Dhaka Office: Dilkusha R/A, Motijheel, Dhaka-1223
              </p>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
