import Commonbanner from "@/components/banners/Commonbanner";
import Teachers from "./Teachers";
import FirstPartAbout from "./FirstPartAbout";
import OurMission from "./OurMission";
import ChooseUs from "./ChooseUs";

const AboutUs = () => {
  const breadcrumbItems = [
    { label: 'হোম', link: '/' },
    { label: 'আমাদের সম্পর্কে' },
  ];
  return (
    <div className=" ">
      <Commonbanner title="ABOUT US" breadcrumbItems={breadcrumbItems}/>
      <FirstPartAbout/>
      <OurMission/>
      <ChooseUs/>
      <Teachers/>
    </div>
  );
};

export default AboutUs;
