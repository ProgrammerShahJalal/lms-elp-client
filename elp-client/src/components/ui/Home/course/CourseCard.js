import Image from "next/image";
import avatar from "../../../../assets/images/img1.png";
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/navigation";

const CourseCard = ({ item }) => {
  return (
    <>
      {/* hover:-translate-y-1 hover:scale-110 */}
      <div className="card shadow-xl cursor-pointer transition ease-in-out delay-150  duration-300 rounded bg-white">
        <figure className="relative">
          <Image
            className="rounded h-48"
            src={item?.banner}
            alt="course"
            width={400}
            height={50}
          />
        </figure>

        <div className="cursor-pointer p-4  hover:bg-white hover:rounded hover:text-cyanPrimary">
          <h2 className="card-title  border px-4 py-2  bg-bluePrimary  ring-1 border-white absolute top-[160px] text-white text-[16px] border-b-0 rounded">
            {item?.title}
          </h2>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image src={avatar} width={40} height={50} alt="avatar" className="rounded-full" />
              <span className="pl-2 text-cyanPrimary hover:text-cyanPrimary">{item?.author}</span>
            </div>
            <div className="flex items-center">
              <PiNotebookBold />{" "}
              <span className="pl-1 text-cyanPrimary font-semibold"> ২০ লেসন</span>
            </div>
          </div>
          <p dangerouslySetInnerHTML={{ __html: item?.description.substring(0, 30) }} ></p>
          <p className="py-3" >
            {/* {item?.description}{" "} */}
            <Link href={`/courses/details/${item?._id}`} className="text-yellowPrimary">
              বিস্তারিত পড়ুন
            </Link>{" "}
          </p>
          <hr />
          <div className="flex justify-between mt-3">
            <p className="text-sm font-semibold py-3 ">
              {" "}
              <span className="pr-5">মেম্বারশিপ ধরন</span>  <span className="bg-blue-200 font-bold px-2 py-1 rounded">{item?.membership_type}</span>
            </p>
            <Link href= '/subscribe' className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded  hover:bg-bluePrimary ">
              সাবস্ক্রাইব করুন
            </Link>
          </div>
         
          {/* <div className=" card-actions justify-center ">
            <button className="bg-bluePrimary text-white py-2 px-2 transition-all duration-300 rounded hover:bg-yellowPrimary">
              এনরোল করুন
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
