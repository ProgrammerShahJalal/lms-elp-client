'use client'

import Image from "next/image";
import book from '../../../assets/images/book.jpg'
import { useState } from "react";

const UserPdfCard = ({item,onOpenPDFModal}) => {
    const MyallOrders = JSON.parse(item?.orders);
    console.log(MyallOrders)
  

   
    return (
        <div className="border rounded w-80">
            <div>
                <Image src={book} width={400}/>
                 <div className="px-5 mb-6">
                 <h2 className="text-xl font-bold py-4">বইয়ের নাম</h2> 
                <button onClick={onOpenPDFModal} className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3 ">বইটি পড়ুন</button>
                 </div>

            </div>
           {/* {MyallOrders &&
          MyallOrders?.map((order) => (
            <AllOrdersSingleBookData
              key={order?.id}
              bookId={order?.book_id}
              price={order?.unit_price}
              quantity={order?.book_quantity}
            />
          ))} */}
        </div>
    );
};

export default UserPdfCard;