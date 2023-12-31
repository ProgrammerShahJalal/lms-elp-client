import { useGetAllSubscriptionsQuery } from "@/redux/api/courseApi";

function CourseSubscriptions({ course_id }) {
  const { data, isError, isLoading } = useGetAllSubscriptionsQuery({
    course_id,
  });
  const subscriptionData = data?.subscriptions?.data;

  const enrollToCourse = async (exam) => {
    const coursePaymentPayload = {
      user_id: getUserInfo()?.userId,
      exam_id: exam?.id,
    };

    Cookies.set("creationPayload", JSON.stringify(coursePaymentPayload));
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/bkash/payment/create",
      {
        amount: `${exam?.fee}`,
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
                    onClick={() => enrollToCourse(subscription?._id)}
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
