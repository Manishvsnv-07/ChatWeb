'use client'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Loginbox = () => {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const router = useRouter();
    const LoginUser = async()=>{
      let data = await axios.post("http://localhost:8080/login",{
        username:Username,
        password:Password
      },{withCredentials:true})
      if(data.status === 200){
        router.push("/profile")
      }
      
    }

    return (
        <div className="LoginBox bg-transparent flex flex-col gap-5 p-3">
          <div className='flex justify-between px-2 items-center'>
          <Link href={"/"}><button className='bg-[#a8f1dfa5] py-1 px-1 hover:bg-[#90d4c3] cursor-pointer text-black'><ChevronLeft /></button></Link>
          <div className='py-1 px-2 font-semibold flex items-center gap-2'>
            <img
            src='/imgs/logo.png'
            className='w-9 h-9 rounded-full'
            alt='ChatWeb logo'
          />
          <span className='text-white font-semibold text-lg tracking-wide'>ChatWeb</span>
          </div>
          </div>
          <input type="text" onChange={(e)=>{
            setUsername(e.target.value)
            
          }} value={Username} placeholder='Enter Username' className='w-full p-3 bg-transparent border border-[#75d1bcbb] text-white rounded-xl outline-none' />
          <input type="password" onChange={(e)=>{
            setPassword(e.target.value)
            
          }} value={Password} placeholder='Enter Password' className='w-full p-3 bg-transparent border border-[#a5f0debb] text-white rounded-xl outline-none' />
          <button onClick={LoginUser} className='bg-[#75d1bc9b] border border-[#75d1bcbb] rounded-md h-11 hover:bg-[#90d4c3] active:scale-99 cursor-pointer'>Login</button>
        </div>
    )
}

export default Loginbox
