import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetMyCourseSubscriptionsHistoryQuery } from "@/redux/api/courseApi";

import Image from "next/image";
import Link from "next/link";

///subscription-histories//my-subscription-histories
// /courses-playlists/course/:course_id
const UserCourses = () => {
  const { data, isLoading, isError } =
    useGetMyCourseSubscriptionsHistoryQuery();

    console.log(data, 'from course subs api')
 
  const courseSubs = data?.courseSubscription;


  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && courseSubs?.length === 0) {
    content = (
      <>
        {" "}
        <EmptyContent />
      </>
    );
  }

  if (!isLoading && !isError && courseSubs?.length > 0) {
    content = courseSubs?.map((item) => (
      <div key={item?._id} className="card card-compact w-72  shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer">
      <figure><Image src={item?.course_id?.banner} alt="course" width={300} height={100} /></figure>
      <div className="card-body">
        <h2 className="card-title"> {item?.course_id?.title}</h2>
        <p><progress className="progress progress-primary w-56" value="10" max="100"> </progress> 0%</p>
       
        <Timer expireDate={item?.expire_date}/>
        
        <hr></hr>
        <div className="card-actions justify-center">
          <Link href={`/user/mycourses/details/${item?.course_id?._id}`} className="text-lg text-yellowPrimary cursor-pointer"> কোর্সটি শুরু করুন</Link>
        </div>
      </div>
    </div>
    ));
  }

  

  return (
    <div className="">
      <div className="grid lg:grid-cols-2 gap-4">{content}</div>

      

     
      <h6 className="text-2xl font-bold my-20">Quiz Questions</h6>
    </div>
  );
};

export default UserCourses;
