import React from 'react'

const MyFriendsHead = () => {
  return (
    <div className="head w-full h-1/5 bg-white flex justify-center items-center gap-5">
      <h1>Your Friends</h1>
      <button className='bg-[#ade8d9f8] p-1 rounded-md active:brightness-110 active:scale-99 cursor-pointer'>All Friends</button>
      <button className='bg-[#75d1bc54] p-1 rounded-md active:brightness-110 active:scale-99 cursor-pointer'>Active</button>
    </div>
  )
}

export default MyFriendsHead