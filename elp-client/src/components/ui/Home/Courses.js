import Image from "next/image";
import avatar from '../../../assets/images/img1.png';
import { PiNotebookBold } from "react-icons/pi";
import Link from "next/link";
import CourseCard from "./course/CourseCard";

const Courses = () => {
  return (
    <div className="px-14 py-10">
    <h2 className="mb-5 bg-cyanPrimary w-44 text-white px-2 py-3 rounded">ক্যারিয়ার ট্র্যাক কোর্স</h2>
      <div className="grid lg:grid-cols-3  gap-4">
        
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
        
        
       
       
       
        
      </div>
    </div>
  );
};

export default Courses;
