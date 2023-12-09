import Courses from "./Courses";
import FreeSeminar from "./FreeSeminar";
import Hero from "./Hero";
import ScrollToTopButton from "./ScrollToTopButton";
import SelectCarreer from "./SelectCarreer";

const HomePage = () => {
  return (
    <div className="">
    <br /> <br />
    <br />
        
      <Hero/>
      <FreeSeminar/>
      <Courses/> 
      <SelectCarreer/>
      <ScrollToTopButton/>
    </div>
  );
};
export  default HomePage;
