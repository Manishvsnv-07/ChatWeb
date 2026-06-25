'use client'

import React, { useEffect, useState } from 'react'
import { Settings ,MessageCircleMore, Mars} from 'lucide-react';
import Link from 'next/link';
import { useUserData } from '@/context/useDataContext';
import { getdata } from '../../../Api-Services/profileData';

const ProfileHeader = () => {
  const {UpdateModel , setUpdateModel} = useUserData()
  const [UserData, setUserData] = useState(null)
  console.log(UserData);
  
  useEffect(() => {
    getdata().then((data)=>{
      setUserData(data.userdata.avatar)
      console.log(data);
    })
  }, [])
  
  return (
    <div className="header w-full h-15 bg-[#75d1bc9b] flex items-center justify-between p-5">
        <div className='flex items-center justify-center gap-7'>
        <img src={"/imgs/logo.png"} className='w-11 h-11 rounded-full' alt="" />
        <Link href={'/chat'}><button className='bg-white py-2 px-4 rounded-2xl flex gap-2 active:scale-99 cursor-pointer text-black'><MessageCircleMore size={27} />Start Chat</button></Link>
        </div>
        <div className='flex items-center justify-center gap-7'>
        <button onClick={()=>{
          if(UpdateModel){
            setUpdateModel(false)
          }
          if(!UpdateModel){
            setUpdateModel(true)
          }
        }} className='bg-white py-2 px-4 rounded-2xl flex items-center justify-center gap-2 active:scale-99 cursor-pointer text-black'><Settings color="#000000" />Customize</button>
        <Link href={'/login'}><img src={UserData} className='w-8 h-8 rounded-full' alt="" /></Link>
        </div>
      </div>
  )
}

export default ProfileHeader