'use client'
import axios from 'axios'
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
          <input type="text" onChange={(e)=>{
            setUsername(e.target.value)
            
          }} value={Username} placeholder='Enter Username' className='w-full p-3 bg-transparent border border-[#75d1bcbb] text-white rounded-xl outline-none' />
          <input type="password" onChange={(e)=>{
            setPassword(e.target.value)
            
          }} value={Password} placeholder='Enter Password' className='w-full p-3 bg-transparent border border-[#75d1bcbb] text-white rounded-xl outline-none' />
          <button onClick={LoginUser} className='bg-[#75d1bc9b] border border-[#75d1bcbb] rounded-md h-11 active:brightness-120 active:scale-99 cursor-pointer'>Login</button>
        </div>
    )
}

export default Loginbox