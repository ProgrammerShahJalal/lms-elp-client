import Commonbanner from "@/components/banners/Commonbanner";
import Teachers from "./Teachers";
import FirstPartAbout from "./FirstPartAbout";
import OurMission from "./OurMission";
import ChooseUs from "./ChooseUs";

const AboutUs = () => {
  return (
    <div className=" ">
      <Commonbanner />
      <FirstPartAbout/>
      <OurMission/>
      <ChooseUs/>
      <Teachers/>
    </div>
  );
};

export default AboutUs;
