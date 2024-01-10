import { authKey } from "@/constants/storage";
import {
  useGetAllSubscriptionsQuery,
  useSubscribeToCourseMutation,
} from "@/redux/api/courseApi";
import { getUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function CourseSubscriptions({ course_id }) {
  const router = useRouter();
  const { data, isError, isLoading } = useGetAllSubscriptionsQuery({
    course_id,
  });
  const subscriptionData = data?.subscriptions?.data;
  // console.log(subscriptionData, 'fron sourse subd')

  const enrollToCourse = async (subscription) => {
    
    const coursePaymentPayload = {
      user_id: getUserInfo()?.userId,
      subscription_id: subscription?.id,
    };
    Cookies.set("order_type", "subscription");
    Cookies.set("creationPayload", JSON.stringify(coursePaymentPayload));

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bkash/payment/create`,
      {
        amount: `${subscription?.cost}`,
      },
      {
        withCredentials: true,
        headers: { Authorization: getFromLocalStorage(authKey) },
      }
    );
    router.push(data?.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Buy</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Subscription Name</th>
            <th>Duration</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!!subscriptionData &&
            subscriptionData?.map((subscription) => (
              <tr className="hover" key={subscription?._id}>
                <th className="text-gray-400">#</th>
                <td>{subscription?.name}</td>
                <td>{subscription?.subscription_duration_in_months} Months</td>
                <td>{subscription?.cost}</td>
                <td>
                  <p
                    onClick={() => enrollToCourse(subscription)}
                    className="bg-bluePrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary z-0  cursor-pointer w-fit"
                  >
                    Enroll
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseSubscriptions;
