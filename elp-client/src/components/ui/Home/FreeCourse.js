import Link from "next/link";
import FreeCourseCard1 from "./course/freeCourseCard1";


const FreeCourse = () => {
  return (
    <div>
      <div className="px-14 py-10">
        <div className="flex gap-5">
          <h2 className="text-2xl font-bold px-2  rounded">ফ্রী কোর্সসমূহ</h2>
          <Link href="/courses" className="mb-5 bg-cyanPrimary w-44 text-white px-7 py-3 rounded">সব কোর্স দেখুন</Link>
        </div>
        <div className="grid lg:grid-cols-3  gap-4">
          <FreeCourseCard1 />
          <FreeCourseCard1 />
          <FreeCourseCard1 />






        </div>
      </div>

    </div>
  )
}

export default FreeCourse;