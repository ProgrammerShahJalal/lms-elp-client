import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";

const BookSectionCard = () => {
  return (
    <>
      <div className="card w-[350px]  shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded">
        <figure className="relative">
          <Image
            className="rounded"
            src="https://i.ibb.co/G9hnB13/course-1.webp"
            alt="course"
            width={400}
            height={100}
          />
        </figure>

        <div className="cursor-pointer p-4 hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border w-36 pl-4 py-1 bg-bluePrimary  ring-1 border-white absolute top-56 text-white text-[16px] border-b-0 rounded">
            প্রাইমারী কোর্স
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image src={avatar} width={40} height={50} alt="avatar" className="rounded-full" />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">সাইফুল রাহমান</span>
            </div>
            <div className="flex items-center">
              <PiNotebookBold />{" "}
              <span className="pl-1 text-cyanPrimary font-semibold"> ২০ লেসন</span>
            </div>
          </div>
          
          <hr />
          <div className="flex">
            <p className="text-sm font-semibold py-3">
              {" "}
              কোর্সের মূল্যঃ <del className="text-gray-400 pr-3 "> -500 </del> 3000 Tk
            </p>
          </div>
          <div className=" card-actions justify-start ">
            <button className="text-black transition-all duration-300 rounded hover:text-yellowPrimary font-medium underline">
              বইটি কিনুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSectionCard;
