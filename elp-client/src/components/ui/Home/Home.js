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

const HomePage = () => {
  return (
    <div className="">
      <Hero/>
      <Category/>
      <Courses/> 
      <FreeCourse/>
      <BookSection/>
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
