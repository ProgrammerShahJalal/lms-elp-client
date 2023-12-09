import React from 'react'

const SelectCarreer = () => {
  return (
    <div className=' my-5 bg-bluePrimary rounded py-10'>

    <div className='py-10 text-center text-white'> 
        <h2 className='font-bold text-3xl pb-5'>সফল ক্যারিয়ার গড়তে সঠিক প্রোগ্রামটি বেছে নিন</h2>
        <h5 className=' text-xl pb-5 leading-relaxed'>সফল ক্যারিয়ার গড়তে দরকার সঠিক জায়গায় নিজের সময় আর পরিশ্রম দেয়া। <br /> তাই বহুব্রীহি থেকেই অর্জন করুন জব-রেডি হবার কনফিডেন্স আর স্কিল।</h5>

       <div>
       <button className="bg-cyanPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-transparent hover:border border-cyan-900">সবগুলো কোর্স দেখুন </button>
        <button className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary mx-4">সেমিনারে অংশ নেন </button>
        <button className="bg-yellowPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-cyanPrimary"> কল বক করুন</button>
       </div>
    </div>



    </div>
  )
}

export default SelectCarreer