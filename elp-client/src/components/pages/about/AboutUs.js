import Commonbanner from "@/components/banners/Commonbanner";
import Teachers from "./Teachers";
import FirstPartAbout from "./FirstPartAbout";

const AboutUs = () => {
  return (
    <div className=" ">
      <Commonbanner />
      <FirstPartAbout/>
      <Teachers/>
    </div>
  );
};

export default AboutUs;
