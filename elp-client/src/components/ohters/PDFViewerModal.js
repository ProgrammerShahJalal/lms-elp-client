"use client";

const PDFViewerModal = ({ isOpen, onClose, pdfSrc }) => {
  return (
    <>
      {isOpen && (
       <div className="fixed inset-0 flex items-center justify-center z-50">
       <div className="bg-white p-4 rounded-md h-full w-full">
         <button
           onClick={onClose}
           className="absolute top-0 right-0 text-6xl text-red-600 font-bold"
         >
           &times;
         </button>
         <iframe
           src={pdfSrc}
           height="100%"
           width="100%"
           allow="autoplay"
           className="border border-gray-300"
         ></iframe>
       </div>
     </div>
      )}
    </>
  );
};

export default PDFViewerModal;
