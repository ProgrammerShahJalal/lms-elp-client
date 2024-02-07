'use client'

import Image from "next/image";
import book from '../../../assets/images/book.jpg'
import { useState } from "react";
import UserPdfCardShow from "./UserPdfCardShow";

const UserPdfCard = ({item,onOpenPDFModal}) => {
    const myAllOrders = JSON.parse(item?.orders);

    // console.log(myAllOrders, 'order')
  

   
    return (
        <div className="border rounded w-80">
            <div>
            
                <Image src={book} width={400}/>
                 <div className="px-5 mb-6">
                 <h2 className="text-xl font-bold py-4">বইয়ের নাম</h2> 
                <button onClick={onOpenPDFModal} className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3 ">বইটি পড়ুন</button>
                 </div>

            </div>
           {myAllOrders &&
          myAllOrders?.map((order) => (
            <UserPdfCardShow
              key={order?.id}
              bookId={order?.book_id}
             order={order}
            />
          ))}
        </div>
    );
};

export default UserPdfCard;