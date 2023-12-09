import Image from "next/image"


const UserCourses = () => {
  return (
    <div className="bg-white rounded-lg py-5 border border-gray-200">

    

<div className="card card-compact w-72 bg-base-100 shadow-xl ml-10">
  <figure><Image src="https://i.ibb.co/G9hnB13/course-1.webp" alt="course" width={300} height={100}/></figure>
  <div className="card-body">
    <h2 className="card-title"> Learning Course</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"> 60 days left</button>
    </div>
  </div>
</div>


    </div>
  )
}

export default UserCourses