import React from 'react'

const OtherFriendsCard = () => {
  return (
    <div className='card h-15 px-5 py-2 bg-[#75d1bc54] rounded-md flex justify-between items-center active:scale-99 cursor-pointer'>
            <img src="/imgs/default.png" className='w-11 h-11 rounded-full' alt="" />
            <div>
            <h1>@username</h1>
            <h1>Male</h1>
            </div>
            <img src="/imgs/japan.jpg" className='w-7 h-7 rounded-full' alt="" />
          </div>
  )
}

export default OtherFriendsCard