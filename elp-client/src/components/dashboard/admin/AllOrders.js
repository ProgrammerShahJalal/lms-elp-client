"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import AllOrdersDetials from "./AllOrdersDetials";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useEffect, useState } from "react";
import { useGetAllOrderStatusQuery } from "@/redux/api/orderStatusApi";

const AllOrders = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortedOrder, setSortedOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const ordersData = data?.orders?.data;
  

 


  useEffect(() => {
    if (ordersData) {
      const sortedOrders = [...ordersData].sort((a, b) => {
        if (sortField === "name") {
          const nameA = a.user_id?.name?.toUpperCase() || ""; // Added null check
          const nameB = b.user_id?.name?.toUpperCase() || ""; // Added null check

          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        } else if (sortField === "createdAt") {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();

          return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
        }

        return 0;
      });

      setSortedOrder(sortedOrders);
    }
  }, [ordersData, sortOrder, sortField]);
  const handleSortClick = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    if (ordersData) {
      const sortedOrders = [...ordersData].sort((a, b) => {
        const nameA = a.user_id?.name.toUpperCase();
        const nameB = b.user_id?.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      setSortedOrder(sortedOrders);
    }
  }, [ordersData]);

  const filteredOrders = ordersData?.filter((order) =>
    order?.user_id?.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const uniqueUserNames = [
    ...new Set(ordersData?.map((item) => item?.user_id?.name)),
  ];

  let content = null;

  if (isLoading) {
    content = (
      <>
        <InitialLoader />
      </>
    );
  }

  if (!isLoading && !isError) {
    content = (
      <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 my-5 px-3 rounded text-lg">
        <h5>There is no order now yet</h5>
      </tr>
    );
  }

  if (!isLoading && !isError && sortedOrder?.length === 0) {
    content = (
      <>
        {" "}
        <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
          <h5>All Orders table is Empty Now</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && sortedOrder?.length > 0) {
    content = sortedOrder?.map((item) => (
      <AllOrdersDetials key={item?.id} item={item}   />
    ));
  }

  return (
    <div>
      <div className="flex mb-5"></div>

      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="">
                <th>
                  {" "}
                  <button
                    onClick={() => handleSortClick("name")}
                    className="btn"
                  >
                    নাম
                  </button>
                </th>
                <th>অর্ডার কৃত বইসমুহ </th>
                <th> সর্বমোট মূল্য</th>
                <th>
                  {" "}
                  <button
                    onClick={() => handleSortClick("createdAt")}
                    className="btn"
                  >
                    কেনার তারিখ
                  </button>
                </th>
                <th>ট্রান্সজেকশন আইডি</th>
                <th>স্ট্যাটাস</th>
                {/* <th>পেমেন্ট</th> */}
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
