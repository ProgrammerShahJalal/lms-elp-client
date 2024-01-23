'use client'

import { useGetAllCoursesBundlesQuery } from "@/redux/api/courseApi";
import BundleCourse from "./BundleCourse";
import InitialLoader from "@/components/Loader/InitialLoader";
import Error from "@/components/Loader/Error";



const AllCourseBundleIdPage = ({id}) => {
    const {data, isLoading,isError} = useGetAllCoursesBundlesQuery({
        sub_category_id: id
    });
    
    const allBundles = data?.bundles;
    let content = null;

    if (isLoading) {
      content = (
        <>
          <InitialLoader/>
        </>
      );
    }
  
    if (!isLoading && isError) {
      content = <Error/>;
    }
  
    if (!isLoading && !isError && allBundles?.length === 0) {
      content = (
        <>
          {" "}
          <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
      <h5>এখন কোন বান্ডল কোর্স নাই</h5>
    </div>
        </>
      );
    }
  
    if (!isLoading && !isError && allBundles?.length > 0) {
      content = allBundles?.map((bundle, i) => <BundleCourse key={bundle?._id} bundle={bundle} i={i}/>);
    }
  
    return (
        <div className="py-20">
           
             <div className="grid  lg:grid-cols-2 gap-4">
                {content}

             </div>

            
        </div>
    );
};

export default AllCourseBundleIdPage;