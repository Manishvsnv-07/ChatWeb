"use client"
import React, { useEffect, useState } from 'react'
import AboutMyself from './AboutMyself';
import MyFriends from './MyFriends';
import { getdata } from '../../../Api-Services/profileData';

const AboutUsers = () => {
  const [data, setdata] = useState(null)
  useEffect(() => {
    getdata().then((data) => {
      setdata(data);
      console.log(data);

    })
  }, [])
  if (!data) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
  return (
    <div className="AboutUsers w-full h-full flex flex-col">
      <AboutMyself data={data} />
      <MyFriends />
    </div>
  )
}

export default AboutUsers