import React, { use, useEffect, useState } from 'react'
import { getdata } from '../../../Api-Services/profileData'
import { useQuery } from '@tanstack/react-query'

const MyFriendsHead = () => {
  const {data : Userdata} = useQuery({
    queryKey:["profileData"],
    queryFn:getdata
  })
 
  return (
    <div className="head w-full h-1/5 bg-white flex justify-center items-center gap-5">
      <h1>Your Friends</h1>
      <div className='bg-black text-white p-2 rounded-md'>
        <h1>Friends {Userdata.userdata?.Friends?.length}</h1>
      </div>
    </div>
  )
}

export default MyFriendsHead