'use client'
import useClickedUserStore from '@/store/UserClickeduseStore'
import React, { useEffect, useState } from 'react'

const AboutClickedUser = () => {
  const [hydrated, setHydrated] = useState(false)
  const ClickedUser = useClickedUserStore((state) => state.clickedUser)
  console.log(ClickedUser);
  const Loading = useClickedUserStore((state) => state.isLoading)
  console.log(Loading);

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  if (Loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );

  return (
    <div className='AboutMyself w-full h-1/2 bg-[#75d1bc9b] flex justify-center items-center gap-11 text-white'>
      <div className="picture">
        <img src="/imgs/default.png" className='w-50 h-50 rounded-full' alt="" />
      </div>
      <div className="userdata flex flex-col gap-5 text-black">
        <h1 className='bg-white p-2 rounded-md'>{ClickedUser.username}</h1>
        <h1 className='bg-white p-2 rounded-md'>{ClickedUser.name}</h1>
        <button className='bg-white p-2 rounded-md flex justify-center items-center gap-3'><span>India</span><img src="/imgs/India.jpg" className='w-5 h-5 rounded-full' alt="" /></button>
        <button className='bg-white p-2 rounded-md flex justify-center items-center gap-3'><span>{ClickedUser.gender}</span></button>
        <h1 className='bg-white p-2 rounded-md flex justify-center items-center'>{ClickedUser.status}</h1>
      </div>
    </div>
  )
}

export default AboutClickedUser