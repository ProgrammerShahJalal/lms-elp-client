'use client'

import { useEffect, useState } from "react";

const UserWelcome = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const updateWelcomeMessage = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setTimeOfDay('শুভ সকাল');
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('শুভ অপরাহ্ন');
      } else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay('শুভ সন্ধ্যা');
      } else {
        setTimeOfDay('শুভ রাত');
      }
    };

    updateWelcomeMessage(); 

   
    const intervalId = setInterval(updateWelcomeMessage, 60000);

    return () => clearInterval(intervalId); 
  }, []);



  return (
    <div className='bg-white rounded-lg py-8 w-100 border border-gray-200'>
     <div className='px-10'>
     <h2 className='text-2xl font-bold pb-3 text-cyan-900'>
      {`${timeOfDay} Jesmin`}
    </h2>
        <h5 className='text-cyan-900 text-lg'>লাইভ ক্লাসের খুঁটিনাটি সব জেনে নাও তোমার <span className='text-cyan-900'>ইজি লার্নিং প্লাটফর্ম</span> ড্যাশবোর্ডে</h5>
     </div>
       

    </div>
  )
}

export default UserWelcome