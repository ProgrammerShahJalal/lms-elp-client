import Link from "next/link"
import CourseCard from "./course/CourseCard"
import BookSectionCard from "./course/BookSectionCard"


const BookSection = () => {
  return (
    <div className="px-14 py-10">
    <div className="flex gap-5">
    <h2 className="text-2xl font-bold px-2  rounded">আমাদের সকল বইসমূহ</h2>
    <Link href="/" className="mb-5 bg-cyanPrimary w-44 text-white px-7 py-3 rounded">সব কোর্স দেখুন</Link>
    </div>
      <div className="grid lg:grid-cols-3  gap-4">
        
        <BookSectionCard/>
        <BookSectionCard/>
        <BookSectionCard/>
        
        
       
       
       
        
      </div>
    </div>
  )
}

export default BookSection