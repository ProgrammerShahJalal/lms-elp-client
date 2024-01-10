import CourseAllExams from "@/components/pages/AllCourses/CourseAllExams";

export const metadata = { 
    title: "কোর্স কুইজ ",
  };

const CourseQuizPage = ({params}) => {
    const id = params?.id;
    return (
        <div> 
            <CourseAllExams course_id={id}/>
        </div>
    );
};

export default CourseQuizPage;