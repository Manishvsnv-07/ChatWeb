'use client'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { Search } from 'lucide-react'
import { getUsers } from '../../../Api-Services/AllUser'
import { getdata } from '../../../Api-Services/profileData'
import { io } from 'socket.io-client'

const AllUsers = () => {

  const [Users, setAllUsers] = useState([])
  const [myData, setmyData] = useState('')

  useEffect(() => {
    getUsers().then(data=>{
      setAllUsers(data)
    })
    getdata().then((d)=>{
      setmyData(d.userdata)
    })
  }, [])

  useEffect(() => {
    const socket = io('http://localhost:8080', {
      withCredentials: true,
      autoConnect: true,
      reconnection: true
    })

    socket.on("presence-update", (data) => {
      setAllUsers((prev) => prev.map((user) => {
        if (String(user._id) !== String(data.UserId)) return user

        return {
          ...user,
          isOnline: data.isOnline,
          lastSeen: data.lastSeen || user.lastSeen
        }
      }))
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  

  return (
    <div className='Allusers w-1/4 h-full border-r border-zinc-700 flex flex-col gap-4 p-2 overflow-auto'>
        <div className="search relative h-11 flex items-center">
            <Search className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-500' size={20}/>
            <input type="text" placeholder='Search' className='bg-black border border-zinc-700 text-white w-full h-full py-2 pl-9 outline-0' />
        </div>
        <h1 className='text-zinc-500'>Random</h1>

      {Users.map((data,i)=>(
        <UserCard key={i} user={data} currentUser = {myData}/>
      ))}
  
    </div>
  )
}

export default AllUsers
