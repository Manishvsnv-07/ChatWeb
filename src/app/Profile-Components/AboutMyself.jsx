import React, { useState } from 'react'
import { Mars } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { getOptimizedImage } from '@/utils/cloudinary';
const AboutMyself = ({data}) => {
  const [preview, setpreview] = useState(null)
  const [Avatar, setAvatar] = useState("")

  const handleFile = async (e)=>{
    const file = e.target.files[0] 
    setpreview(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('media',file)

    const res = await axios.post("http://localhost:8080/api/avatar",formData,{
      withCredentials: true,
      headers:{"Content-Type":"multipart/form-Data"}
    })
  
  }
  
  return (
    <div className='AboutMyself w-full h-1/2 bg-[#75d1bc9b] flex justify-center items-center gap-11 text-white'>
          <div className="relative h-50 w-50 rounded-full border border-white">
            <Image 
            src={getOptimizedImage( preview || data?.userdata?.avatar || "/imgs/default.png" , {width:200 ,height:200}) } 
            fill
            quality={100}
            sizes='200px'
            className='rounded-full object-cover'
            alt="avatar" 
            priority = {true}
            />
            <input onChange={handleFile} accept='image/*' type="file" name='media' style={{ fontSize: 0 }}  className='absolute inset-0 z-10 opacity-0 w-full h-full  rounded-full cursor-pointer' />
          </div>
          <div className="userdata flex flex-col gap-5 text-black">
            <h1 className='bg-white p-2 rounded-md'>{data.userdata.username}</h1>
            <h1 className='bg-white p-2 rounded-md'>{data.userdata.name}</h1>
            <button className='bg-white p-2 rounded-md flex justify-center items-center gap-3'><span>{data.userdata.country}</span><img src={`https://flagcdn.com/w40/${data.userdata.countrycode}.png`} className='h-6 w-6 rounded-full object-cover' alt="" /></button>
            <button className='bg-white p-2 rounded-md flex justify-center items-center gap-3'><span>{data.userdata.gender}</span><Mars size={21} color="#000000" /></button>
            <h1 className='bg-white p-2 rounded-md flex justify-center items-center'>{data.userdata.status}</h1>
          </div>
        </div>
  )
}

export default AboutMyself
