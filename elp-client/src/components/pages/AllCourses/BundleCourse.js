"use client";

import { useGetSingleCourseQuery } from "@/redux/api/courseApi";
import Image from "next/image";
import bundleImg from '../../../assets/images/bundle.jpg'
import Link from "next/link";

const BundleCourse = ({ bundle,i }) => {
    const bundleCourse = bundle?.subscriptions[0]?.course_id
    const {data:singleCourse} = useGetSingleCourseQuery(bundleCourse)
//   console.log(bundle);

  return (
    <div className="">
      <h2 className="text-4xl font-bold py-4"> {bundle?.subscription_duration_in_months} মাসের কোর্স বান্ডিল</h2>
      
     <div className="flex">
     {/* <h2 className="text-2xl font-bold py-4">{i+1}</h2> */}
     <div className="border rounded">
      
      <div className="flex items-center">
          <div>
             
              <Image src={singleCourse?.banner} height={20} width={200}/>
          </div>
          <div className="px-2">
              <h2 className="text-2xl font-bold py-4">{singleCourse?.title}</h2>
              <h5 className="text-yellowPrimary text-lg">{singleCourse?.author}</h5>
              <p> প্রতিটি কোর্সের মূল্য {bundle?.subscriptions[0]?.cost} টাকা</p>
          </div>
          
      </div>

    </div>
     </div>

     <div className="border rounded mt-10  w-80">
                <div>
                    <Image src={bundleImg} />
                </div>
                 <div className="py-5 pl-5">
                    <h3 className="text-xl font-bold pb-5"> মোট {bundle?.total_cost} টাকা</h3>
                 <Link
              href="/"
              className="bg-yellowPrimary text-white py-3 px-10 transition-all duration-300 rounded  hover:bg-bluePrimary "
            >
              বান্ডিল কোর্সটি কিনুন
            </Link>
                 </div>
             </div>

    </div>
  );
};

export default BundleCourse;
