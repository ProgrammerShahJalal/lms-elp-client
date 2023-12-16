import MemeberShipPlan from "@/components/ohters/MemeberShipPlan";
import Benefits from "./Benefits";
import BookSection from "./BookSection";
import Category from "./Category";
import Courses from "./Courses";
import FreeCourse from "./FreeCourse";
import FreeSeminar from "./FreeSeminar";
import Hero from "./Hero";
import HomeQuiz from "./HomeQuiz";
import ScrollToTopButton from "./ScrollToTopButton";
import SelectCarreer from "./SelectCarreer";
import Testing from "./Testing";
import Faq from "./Faq";

const HomePage = () => {
  return (
    <div className="">
      <Hero/>
      <Category/>
      <Courses/> 
      <MemeberShipPlan/>
      <FreeCourse/>
      <BookSection/>
      <FreeSeminar/>
      {/* <Testing/> */}
      <Benefits/>
      <Faq/>
      <HomeQuiz/>
      <SelectCarreer/>
      <ScrollToTopButton/>
    </div>
  );
};
export  default HomePage;
