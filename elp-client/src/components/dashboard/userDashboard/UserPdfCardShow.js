'use client'

import { useGetSingleBookQuery } from "@/redux/api/booksApi";
import Image from "next/image";
import book from "../../../assets/images/book.jpg";
import { useState } from "react";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";

const UserPdfCardShow = ({ bookId, order,onOpenPDFModal, index}) => {
    const {data} = useGetSingleBookQuery(bookId);

    return (
        <>
        
         <div className="border rounded">
        <Image src={book} width={400} alt="book-img"/>
        <div className="px-5 mb-6">
          <h2 className="text-xl font-bold py-4">{data?.title ? data?.title :"বইটি নাই"}</h2>
          <button
            onClick={onOpenPDFModal}
            className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3 "
          >
            বইটি পড়ুন
          </button>
        </div>
      </div>
            
        </>
    );
};

export default UserPdfCardShow;