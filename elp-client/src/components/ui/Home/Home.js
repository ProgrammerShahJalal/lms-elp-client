import Benefits from "./Benefits";
import Category from "./Category";
import Courses from "./Courses";
import FreeSeminar from "./FreeSeminar";
import Hero from "./Hero";
import HomeQuiz from "./HomeQuiz";
import ScrollToTopButton from "./ScrollToTopButton";
import SelectCarreer from "./SelectCarreer";
import Testing from "./Testing";

const HomePage = () => {
  return (
    <div className="">
    <br /> <br />
    <br />
        
      <Hero/>
      <Category/>
      <Courses/> 
      <FreeSeminar/>
      {/* <Testing/> */}
      <Benefits/>
      <HomeQuiz/>
      <SelectCarreer/>
      <ScrollToTopButton/>
    </div>
  );
};
export  default HomePage;
