"use client";

import { useEffect } from "react";

const PDFViewerModal = ({ isOpen, onClose, pdfSrc }) => {
  useEffect(() => {
    if (isOpen) {
      const disableContextMenu = (e) => e.preventDefault();
      const disableShortcuts = (e) => {
        if (
          (e.ctrlKey && e.key === 'u') || // Disable View Source (Ctrl+U)
          (e.ctrlKey && e.key === 's') || // Disable Save (Ctrl+S)
          (e.ctrlKey && e.key === 'p') || // Disable Print (Ctrl+P)
          (e.ctrlKey && e.key === 'c') || // Disable Copy (Ctrl+C)
          (e.ctrlKey && e.key === 'i') || // Disable Developer Tools (Ctrl+Shift+I)
          (e.key === 'F12') // Disable Developer Tools (F12)
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener('contextmenu', disableContextMenu);
      document.addEventListener('keydown', disableShortcuts);

      return () => {
        document.removeEventListener('contextmenu', disableContextMenu);
        document.removeEventListener('keydown', disableShortcuts);
      };
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center scroll-smooth select-none z-50">
          <div className="bg-white p-4 rounded-md h-full w-full relative">
            <div className="bg-white py-1 px-36 md:px-96 absolute top-0 right-0 text-green-500 font-bold flex items-center z-10">
              <h2 className="text-center px-12 md:px-32">TOP</h2>
              <h2 className="text-center px-12 md:px-32">SECURE</h2>
              <img
                className="w-16 py-3"
                src="https://i.ibb.co/qNjGQnB/2592258.png"
                alt="secure"
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-6xl text-red-600 font-bold z-10"
            >
              &times;
            </button>

            <div className="relative z-0 h-full w-full pointer-events-none">
              <iframe
                src={pdfSrc}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                className="pointer-events-auto"
              ></iframe>
              <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewerModal;
