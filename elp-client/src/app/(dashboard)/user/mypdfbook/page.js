"use client";

import InitialLoader from "@/components/Loader/InitialLoader";
import UserPdfCard from "@/components/dashboard/userDashboard/UserPdfCard";
import PDFViewerModal from "@/components/ohters/PDFViewerModal";
import { useGetMyAllOrdersDetailsQuery } from "@/redux/api/orderApi";
import { useState } from "react";

const MyPurchasePdfPage = () => {
    const [openPDFModals, setOpenPDFModals] = useState([]);

  const { data, isLoading, isError } = useGetMyAllOrdersDetailsQuery();
  // console.log(data, 'form user order');
  const bookOrdersData = data?.orders;

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
        <h5>আপনি কোন বই কিনেন নি এখনো</h5>
      </tr>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length === 0) {
    content = (
      <>
        {" "}
        <>
          <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg">
            <h5>আপনি কোন বই কিনেন নি এখনো</h5>
          </div>
          <div>

          </div>
        </>
      </>
    );
  }

  if (!isLoading && !isError && bookOrdersData?.length > 0) {
    content = bookOrdersData?.map((item, index) => (
      <UserPdfCard key={item?.id} item={item} onOpenPDFModal={() => openPDFModal(index)}/>
    ));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-20">{content}</div>

      {openPDFModals?.map((isOpen, index) => (
        <PDFViewerModal
          key={index}
          isOpen={isOpen}
          onClose={() => closePDFModal(index)}
          pdfSrc={data?.books?.data[index]?.pdf_link}
        />
      ))}
    </>
  );
};

export default MyPurchasePdfPage;
