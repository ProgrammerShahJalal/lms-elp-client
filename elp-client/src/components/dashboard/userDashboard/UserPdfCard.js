"use client";

import Image from "next/image";
import book from "../../../assets/images/book.jpg";
import { useState } from "react";
import UserPdfCardShow from "./UserPdfCardShow";

const UserPdfCard = ({ item, index }) => {
  const [openPDFModals, setOpenPDFModals] = useState([]);
  const myAllOrders = JSON.parse(item?.orders);
  console.log(myAllOrders,"from all orders")

 


  const openPDFModal = (index) => {
    const updatedModals = [...openPDFModals];
    updatedModals[index] = true;
    setOpenPDFModals(updatedModals);
  };

  const closePDFModal = (index) => {
    const updatedModals = [...openPDFModals];
    updatedModals[index] = false;
    setOpenPDFModals(updatedModals);
  };

  return (
    <>
      {/* <div>
        <Image src={book} width={400} />
        <div className="px-5 mb-6">
          <h2 className="text-xl font-bold py-4">বইয়ের নাম</h2>
          <button
            onClick={onOpenPDFModal}
            className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3 "
          >
            বইটি পড়ুন
          </button>
        </div>
      </div> */}
      {myAllOrders &&
        myAllOrders?.map((order, index) => (
          <UserPdfCardShow
            key={order?.id}
            bookId={order?.book_id}
            // onClose={() => closePDFModal(index)}
            order={order}
            index={index}
          />
        ))}

      {openPDFModals?.map((isOpen, index) => (
        <PDFViewerModal
          key={index}
          isOpen={isOpen}
          onClose={() => closePDFModal(index)}
          pdfSrc={data[index]?.pdf_link}
          // pdfSrc="https://drive.google.com/file/d/1_hqXWDM0tzBM2WX9Sg4_pn7W0yaCTVPk/preview"
        />
      ))}
    </>
  );
};

export default UserPdfCard;
