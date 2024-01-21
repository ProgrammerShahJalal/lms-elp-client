"use client";

// import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
// import AllOrdersDetials from "./AllOrdersDetials";
// import InitialLoader from "@/components/Loader/InitialLoader";
// import { useState } from "react";

// const AllOrders = () => {
//   const [filterValue, setFilterValue] = useState('');

//   const handleFilterChange = (event) => {
//     setFilterValue(event.target.value);
//   };
//   const { data, isLoading, isError } = useGetAllOrdersQuery();
//   // const { data, isLoading, isError } = useGetAllOrdersQuery();
//   const ordersData = data?.orders?.data;

//   const filteredOrders = ordersData?.filter((order) =>
//     order?.user_id?.name.toLowerCase().includes(filterValue.toLowerCase())
//   );

 
//   const allName = ordersData?.map((item)=><div key={item?.id}>
//     {item?.user_id?.name}
//   </div>)
//   // console.log(allName)

//   let content = null;

//   if (isLoading) {
//     content = (
//       <>
//         <InitialLoader />
//       </>
//     );
//   }

//   if (!isLoading && !isError) {
//     // content = <Error/>;
//     content = (
//       <tr className="flex justify-center items-center font-bold bg-green-400  text-white py-3 my-5 px-3 rounded text-lg">
//         <h5>There is no order now yet</h5>
//       </tr>
//     );
//   }

//   if (!isLoading && !isError && filteredOrders?.length === 0) {
//     content = (
//       <>
//         {" "}
//         <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
//           <h5>All Orders table are Empty Now</h5>
//         </div>
//       </>
//     );
//   }
 

//   if (!isLoading && !isError && filteredOrders?.length > 0) {
//     content = filteredOrders?.map((item) => (
//       <AllOrdersDetials key={item?.id} item={item} />
//     ));
//   }

//   return (
//     <div>
     
//       <input
//         type="text"
//         placeholder="Filter by user name"
//         value={filterValue}
//         onChange={handleFilterChange} className="border px-4 py-2 bg-gray-200 rounded outline-none mb-5"
//       />

//       {ordersData?.map((item)=><div key={item?.id}>
//     {item?.user_id?.name}
//   </div>)}
//       <div className="border">
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead> 
//               <tr className="">
//                 <th>নাম </th>
//                 <th>অর্ডার কৃত বইসমুহ </th>
//                 <th> সর্বমোট মূল্য</th>
//                 <th>কেনার তারিখ</th>
//                 <th>ট্রান্সজেকশন আইডি</th>
//                 <th>স্ট্যাটাস</th>
//                 <th>পেমেন্ট</th>
//               </tr>
//             </thead>
//             <tbody>{content}</tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrders;

// Import your existing dependencies and components
import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import AllOrdersDetials from "./AllOrdersDetials";
import InitialLoader from "@/components/Loader/InitialLoader";
import { useEffect, useState } from "react";

const AllOrders = () => {
  const [filterValue, setFilterValue] = useState('');
  // const [selectedUser, setSelectedUser] = useState(null);
  const [sortedOrder, setSortedOrder] = useState([]);

  // const handleFilterChange = (event) => {
  //   setFilterValue(event.target.value);
  //   setSelectedUser(null); // Reset selected user when filter changes
  // };

  // const handleUserSelect = (userId) => {
  //   setSelectedUser(userId);
  // };

  const { data, isLoading, isError } = useGetAllOrdersQuery();
  const ordersData = data?.orders?.data;
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
  
      // Update the state or use the sortedOrders as needed
      setSortedOrder(sortedOrders);
    }
  }, [ordersData]);
  
  

  const filteredOrders = ordersData?.filter((order) =>
    order?.user_id?.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const uniqueUserNames = [...new Set(ordersData?.map((item) => item?.user_id?.name))];

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
          <h5>All Orders table are Empty Now</h5>
        </div>
      </>
    );
  }

  if (!isLoading && !isError && sortedOrder?.length > 0) {
    content = sortedOrder?.map((item) => (
      <AllOrdersDetials key={item?.id} item={item} />
    ));
  }

  return (
    <div>
      <div className="flex mb-5">
        {/* <input
          type="text"
          placeholder="Filter by user name"
          value={filterValue}
          onChange={handleFilterChange}
          className="border px-4 py-2 bg-gray-200 rounded outline-none mb-5"
        />
        <select
          className="border px-4 py-2 bg-gray-200 rounded outline-none ml-2"
          onChange={(e) => handleUserSelect(e.target.value)}
          value={selectedUser || ''}
        >
          <option value="" disabled>
            Select User
          </option>
          {uniqueUserNames?.map((userName) => (
            <option key={userName} value={userName}>
              {userName}
            </option>
          ))}
        </select> */}
      </div>

      {/* {selectedUser && (
        <div className="mt-3">
          <h2 className="text-lg font-semibold mb-2">{`Orders for ${selectedUser}`}</h2>
          {filteredOrders
            .filter((order) => order?.user_id?.name === selectedUser)
            .map((item) => (
              <AllOrdersDetials key={item?.id} item={item} />
            ))} */}
        {/* </div>
      )} */}

      <div className="border">
        <div className="overflow-x-auto">
          <table className="table">
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

