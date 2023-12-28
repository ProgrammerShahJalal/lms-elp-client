import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Image from "next/image";
import Link from "next/link";

const CourseDetailsData = ({ data, isError, isLoading }) => {
   console.log(data)
  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader/>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error></Error>;
  }

 

  if (!isLoading && !isError && data) {
    content = (<div className="grid lg:grid-cols-2 gap-5 my-10">
      <div>
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">{data?.title}</h2>

          <p > <span className=" text-bluePrimary pr-10 font-semibold"> Category: {data?.sub_category_id?.title} </span>  Sub Category: <span className=" text-yellowPrimary">{data?.sub_category_id?.title}</span > </p>
          <Image
            className="rounded"
            src={data?.banner}
            alt="course"
            width={600}
            height={50}
          />

          <div>
            {/* <p>
              {data?.description}
            </p> */}
            <p dangerouslySetInnerHTML={{ __html: data?.description }} ></p>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded border py-10 px-5">
          <h2 className="text-xl font-bold">কী কী শিখবেন এ কোর্স থেকে?</h2>

          <ul className="grid grid-cols-2 gap-2 ">
            <li>☑  English</li>
            <li>☑  English</li>
            <li>☑  English</li>
            <li>☑  English</li>
            <li>☑  English</li>
            <li>☑  English</li>
          </ul>
          <br />
          <div className="mt-14">
            
            <a href="https://drive.google.com/file/d/178gMk281mQtMJrVHtR7nytcphA_uoIDk/view?usp=sharing" target="_blank" className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary "> ফুল সিলেবাস দেখুন</a>
          </div>

        </div>
      </div>

      <div className="pl-10">
        <div className="bg-white rounded border py-10 px-4 w-96">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">এই কোর্সের ভেতরে যা যা রয়েছে</h2>
            <ul>
              <li className=""> ⏺ 100% পর্যন্ত স্কলারশিপ জেতার সুযোগ</li>
              <li className=""> ⏺ 100% পর্যন্ত স্কলারশিপ জেতার সুযোগ</li>
              <li className=""> ⏺ 100% পর্যন্ত স্কলারশিপ জেতার সুযোগ</li>
              <li className=""> ⏺ 100% পর্যন্ত স্কলারশিপ জেতার সুযোগ</li>
            </ul>
            <div className="space-y-10 pt-6">
              
              <a href="https://forms.gle/3vjsXVuQi2vUomHX7" className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary " target="_blank"> সেমিনারে অংশ নেন</a>
              <br /> <br />
              <Link href="/subscribe" className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary">
                এখনই মেম্বারশিপ  হোন
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>)
  }

  // console.log(data)
  return (
    <>{content}</>
  );
};

export default CourseDetailsData;
