"use client"
import React, { useEffect, useState } from 'react'
import AboutMyself from './AboutMyself';
import MyFriends from './MyFriends';
import { getdata } from '../../../Api-Services/profileData';
import AboutUsersSkeleton from '../profile-skeleton/AboutUserSkeleton';
import { useQuery } from '@tanstack/react-query';

const AboutUsers = () => {
  
  const { data, isLoading } = useQuery({
    queryKey: ['profileData'],  
    queryFn: getdata,           
  })

  if (!data) return <AboutUsersSkeleton />
  return (
    <div className="AboutUsers w-full h-full flex flex-col">
      <AboutMyself data={data} />
      <MyFriends />
    </div>
  )
}

export default AboutUsers
