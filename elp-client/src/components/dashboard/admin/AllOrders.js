"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import AllOrdersDetials from "./AllOrdersDetials";
import InitialLoader from "@/components/Loader/InitialLoader";

const AllOrders = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const ordersData = data?.orders?.data;
  console.log(data?.orders?.data);

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && !isError) {
    // content = <Error/>;
    content = (
      <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 my-5 px-3 rounded text-lg">
        <h5>There is no order now yet</h5>
      </tr>
    );
  }

  if (!isLoading && !isError && ordersData?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>All Orders table are Empty Now</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && ordersData?.length > 0) {
    content = ordersData?.map((item) => (
      <AllOrdersDetials key={item?.id} item={item} />
    ));
  }

  return (
    <div>
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="">
                <th>অর্ডার কৃত বইসমুহ </th>
                <th> সর্বমোট মূল্য</th>
                <th>কেনার তারিখ</th>
                <th>ট্রান্সজেকশন আইডি</th>
                <th>স্ট্যাটাস</th>
                <th>পেমেন্ট</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
