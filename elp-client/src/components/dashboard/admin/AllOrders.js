"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import AllOrdersDetials from "./AllOrdersDetials";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useState } from "react";

const AllOrders = () => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  // const { data, isLoading, isError } = useGetAllOrdersQuery();
  const ordersData = data?.orders?.data;

  const filteredOrders = ordersData?.filter((order) =>
    order?.user_id?.name.toLowerCase().includes(filterValue.toLowerCase())
  );

 
  const allName = ordersData?.map((item)=><div key={item?.id}>
    {item?.user_id?.name}
  </div>)
  // console.log(allName)

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

  if (!isLoading && !isError && filteredOrders?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>All Orders table are Empty Now</h5>
        </div>
      </>
    );
  }
 

  if (!isLoading && !isError && filteredOrders?.length > 0) {
    content = filteredOrders?.map((item) => (
      <AllOrdersDetials key={item?.id} item={item} />
    ));
  }

  return (
    <div>
     
      <input
        type="text"
        placeholder="Filter by user name"
        value={filterValue}
        onChange={handleFilterChange} className="border px-4 py-2 bg-gray-200 rounded outline-none mb-5"
      />

      {ordersData?.map((item)=><div key={item?.id}>
    {item?.user_id?.name}
  </div>)}
      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead> 
              <tr className="">
                <th>নাম </th>
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
