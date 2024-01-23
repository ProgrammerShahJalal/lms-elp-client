'use client'

import { useGetAllOrderStatusQuery, useOrderStatusChangeMutation } from "@/redux/api/orderStatusApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SingleOrderStatus = ({orderDetailsId}) => {
    const [orderStatus, setOrderStatus] = useState("")
   
    const [selectedStatus, setSelectedStatus] = useState("")
    const { data: statusData } = useGetAllOrderStatusQuery({
        order_details_id: orderDetailsId
    });
    const allOrdersStatus= statusData?.allStatus?.data;
  
    const [orderStatusChange] = useOrderStatusChangeMutation();
    const handleStatusChange = async () => {
      try {
        await orderStatusChange(orderDetailsId, { status: selectedStatus });
        toast.success("Order Status Updated Successfully");
        // Assuming the mutation is successful, update the local state
        setOrderStatus(selectedStatus);
      } catch (error) {
        console.error("Error updating order status:", error);
        toast.error("Error updating order status");
      }
    };
  
    
    useEffect(()=>{
      if(allOrdersStatus?.length){
        setOrderStatus(allOrdersStatus[0]?.status)

      }
    },[allOrdersStatus])
    return (
        
      <p>
      <p> {orderStatus}</p>
      
      <select
        id="statusDropdown"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        {["Pending Approval", "Approved", "On The Way", "Delivered"]?.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button onClick={handleStatusChange} >Update Status</button>
    </p>
       
    );
};

export default SingleOrderStatus;