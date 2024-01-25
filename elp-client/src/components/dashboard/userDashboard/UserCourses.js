import EmptyContent from "@/components/Loader/EmptyContent";
import Error from "@/components/Loader/Error";
import InitialLoader from "@/components/Loader/InitialLoader";
import Timer from "@/components/pages/AllCourses/Timer";
import { useGetMyCourseSubscriptionsHistoryQuery } from "@/redux/api/courseApi";
import Link from "next/link";

///subscription-histories//my-subscription-histories
// /courses-playlists/course/:course_id
const UserCourses = () => {
  const { data, isLoading, isError } =
    useGetMyCourseSubscriptionsHistoryQuery();

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
    content = (
      <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
        <h5>You don't buy course yet now</h5>
      </div>
    );
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
      <div
        key={item?._id}
        className="w-80 h-auto shadow-xl border rounded-lg border-lime-500"
      >
          <img
            src={item?.course_id?.banner}
            alt="course"
          />
       
        <div className="card-body text-center">
          <h2 className="font-bold text-lg"> {item?.course_id?.title}</h2>
          

          <Timer expireDate={item?.expire_date} />

          <hr></hr>
          
          <div className="card-actions justify-center">
            <Link
              href={`/user/mycourses/details/${item?.course_id?._id}`}
              className="text-lg text-yellowPrimary hover:text-green-500 cursor-pointer"
            >
              {" "}
              কোর্সটি শুরু করুন
            </Link>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="flex items-center justify-center">
    <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10">
      {content}
    </div>
  </div>
  
  );
};

export default UserCourses;
