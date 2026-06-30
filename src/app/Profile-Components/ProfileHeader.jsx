'use client'

import React, { useEffect, useState } from 'react'
import { Settings, MessageCircleMore, Mars } from 'lucide-react';
import Link from 'next/link';
import { useUserData } from '@/context/useDataContext';
import { getdata } from '../../../Api-Services/profileData';
import { useMessageNotify } from '@/context/MessageNotification';
import Image from 'next/image';
import { getOptimizedImage } from '@/utils/cloudinary';

const ProfileHeader = () => {
  const { UpdateModel, setUpdateModel } = useUserData()
  const [UserData, setUserData] = useState(null)
  const [Count, setCount] = useState({})
  const { setMessageLen } = useMessageNotify()
  const { MessageLen } = useMessageNotify()


  useEffect(() => {
    getdata().then((data) => {
      setUserData(data.userdata)
    })
  }, [])

  useEffect(() => {
    if (!UserData?._id) return;
    fetch(`http://localhost:8080/api/UnreadMsgData/${UserData?._id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        const totalUnread = data.UnreadData.reduce((sum, item) => sum + item.unreadCount, 0)
        setMessageLen(totalUnread)
      })
  }, [UserData?._id])

  return (
    <div className="header w-full h-15 bg-[#75d1bc9b] flex items-center justify-between p-5">
      <div className='flex items-center justify-center gap-7'>
        <Image
          src={"/imgs/logo.png"}
          width={50}
          height={50}
          loading='eager'
          className='rounded-full object-cover'
          alt="Logo"
        />
        <Link href={'/chat'}>
          <button className={`${MessageLen > 0 ? 'bg-[#20e6b89b]' : 'bg-white'} py-2 px-4 rounded-2xl flex gap-2 active:scale-99 cursor-pointer text-black`}>
            <MessageCircleMore size={27} />
            <span className='hidden sm:block'>Start Chat</span>
            {MessageLen > 0 && (
              <span className=''>
                ({MessageLen})
              </span>
            )}
          </button>
        </Link>
      </div>
      <div className='flex items-center justify-center gap-7'>
        <button onClick={() => {
          if (UpdateModel) {
            setUpdateModel(false)
          }
          if (!UpdateModel) {
            setUpdateModel(true)
          }
        }} className='bg-white py-2 px-4 rounded-2xl flex items-center justify-center gap-2 active:scale-99 cursor-pointer text-black'><Settings color="#000000" /><span className='hidden sm:block'>Customize</span></button>
        <div className='relative w-8 h-8 rounded-full'>
          {UserData?.avatar ? (
      <Image
        src={getOptimizedImage( UserData.avatar,{width:40,height:40})}
        fill
        sizes='40px'
        quality={100}
        className='rounded-full object-cover'
        alt="Dp"
        loading='eager'
      />
    ) : (
      <div className='w-10 h-10 rounded-full bg-[9cecdb]' /> // fallback
    )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader