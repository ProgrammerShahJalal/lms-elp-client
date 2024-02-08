"use client";
import { useGetSingleBookQuery } from "@/redux/api/booksApi";
import Image from "next/image";
import book from "../../../assets/images/book.jpg";
import { useState } from "react";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";


const UserPdfCardShow = ({ bookId, order, index }) => {
  const { data } = useGetSingleBookQuery(bookId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenPDFModal = () => {
    console.log("clicked")
    setIsModalOpen(true);
  };

  const onClosePDFModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border rounded">
        <Image src={book} width={400} alt="book-img" />
        <div className="px-5 mb-6">
          <h2 className="text-xl font-bold py-4">
            {data?.title ? data?.title : "বইটি নাই"}
          </h2>
          <button
            onClick={onOpenPDFModal}
            className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3"
          >
            বইটি পড়ুন
          </button>
        </div>
      </div>
      {isModalOpen && (
  <PDFViewerModal isOpen={isModalOpen} pdfSrc={data?.pdf_link} onClose={onClosePDFModal} />
)}

    </>
  );
};

export default UserPdfCardShow;

// import { useGetSingleBookQuery } from "@/redux/api/booksApi";
// import Image from "next/image";
// import book from "../../../assets/images/book.jpg";
// import { useState } from "react";
// import PDFViewerModal from "@/components/ohters/PDFViewerModal";

// const UserPdfCardShow = ({ bookId, order,onOpenPDFModal, index}) => {
//     const {data} = useGetSingleBookQuery(bookId);

//     return (
//         <>

//          <div className="border rounded">
//         <Image src={book} width={400} alt="book-img"/>
//         <div className="px-5 mb-6">
//           <h2 className="text-xl font-bold py-4">{data?.title ? data?.title :"বইটি নাই"}</h2>
//           <iframe
//               src={data?.pdf_link}
//               height="100%"
//               width="100%"
//               allow="autoplay"
//               className="border border-gray-300"
//             ></iframe>
//           <button
//             onClick={onOpenPDFModal}
//             className="rounded-lg font-bold text-lg bg-yellowPrimary text-white px-10 py-3 "
//           >
//             বইটি পড়ুন
//           </button>
//         </div>
//       </div>

//         </>
//     );
// };

// export default UserPdfCardShow;
