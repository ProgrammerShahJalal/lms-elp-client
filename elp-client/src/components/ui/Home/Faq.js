const Faq = () => {
  return (
    <div className="px-14 py-20">
      <h2 className="text-center py-7 text-2xl font-bold">আপনার কিছু কমন প্রশ্নের উত্তর</h2>
      <div className="bg-white p-5 rounded border space-y-4">
      <div tabIndex={0} className="collapse collapse-arrow border border-gray-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">Focus me to see content</div>
        <div className="collapse-content">
          <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">Focus me to see content</div>
        <div className="collapse-content">
          <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">Focus me to see content</div>
        <div className="collapse-content">
          <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">Focus me to see content</div>
        <div className="collapse-content">
          <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Faq;
