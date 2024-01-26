'use client'
import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import AllOrdersDetials from "./AllOrdersDetials";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";

const AllOrders = () => {
  const [sortedOrder, setSortedOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const ordersData = data?.orders?.data;

  useEffect(() => {
    if (ordersData) {
      const filteredAndSortedOrders = ordersData
        .filter((order) =>
          order?.user_id?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortField === "name") {
            const nameA = a.user_id?.name?.toUpperCase() || "";
            const nameB = b.user_id?.name?.toUpperCase() || "";
            return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          } else if (sortField === "createdAt") {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
          }
          return 0;
        });

      setSortedOrder(filteredAndSortedOrders);
      setFilteredOrders(filteredAndSortedOrders);
    }
  }, [ordersData, sortOrder, sortField, searchTerm]);

  const handleSortClick = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const debouncedTerm = useDebounced({
    searchQuery:searchTerm,
    delay:600
  })
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    // Update the search term after the debounced delay
    setSearchTerm(debouncedTerm);
  }, [debouncedTerm]);
  let content = null;

  if (isLoading) {
    content = <InitialLoader />;
  } else if (!isError && sortedOrder.length === 0) {
    content = (
      <div className="flex justify-center items-center font-bold bg-green-400 text-white py-3 rounded text-lg">
        <h5>{searchTerm ? 'No matching orders found' : 'All Orders table is Empty Now'}</h5>
      </div>
    );
  } else if (!isError && sortedOrder.length > 0) {
    content = sortedOrder.map((item) => (
      <AllOrdersDetials key={item?.id} item={item} />
    ));
  }

  return (
    <div>
      <input
        type="text"
        className="border px-5 py-2 outline-none rounded"
        placeholder="Search Order using Name"
        onChange={handleSearchChange}
      />

      <div className="flex mb-5"></div>

      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="">
                <th>
                  <button onClick={() => handleSortClick("name")} className="btn">
                    নাম
                  </button>
                </th>
                <th>অর্ডার কৃত বইসমুহ </th>
                <th> সর্বমোট মূল্য</th>
                <th>
                  <button onClick={() => handleSortClick("createdAt")} className="btn">
                    কেনার <br/> তারিখ
                  </button>
                </th>
                <th>ট্রান্সজেকশন আইডি</th>
                <th>প্রেরণের ঠিকানা</th>
                <th>স্ট্যাটাস</th>
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

