import BreadCrumb from "../breadcrumb/BreadCrumb";


const Commonbanner = () => {
    const breadcrumbItems = [
        { label: 'হোম ', link: '/' },
        { label: 'আমাদের সম্পর্কে',  },
       
      ];
  return (
    <div className="bg-white h-screen">
      <div className="banner  py-14">
        <div className="flex justify-center items-center">
            <div>
            <h2 className="font-bold text-2xl"> About Us</h2>
            <BreadCrumb items={breadcrumbItems}  />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Commonbanner;
