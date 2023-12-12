import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center py-24'>
      <div>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </div>
  )
}

export default Loading