'use client'
import React, { useEffect, useState } from 'react'
import Gender from '../Create-Components/Gender'
import Status from '../Create-Components/Status'
import { Pencil, X } from 'lucide-react'
import { useUserData } from '@/context/useDataContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getdata } from '../../../Api-Services/profileData'

const Customization = () => {

  const [Uusername, UpdateUsername] = useState("")
  const [Uname, UpdateName] = useState("")
  const [Ugender, UpdateGender] = useState("")
  const [Ustatus, UpdateStatus] = useState("")

  useEffect(() => {
    getdata().then((data) => {
      UpdateUsername(data.userdata.username)
      UpdateName(data.userdata.name)
      UpdateGender(data.userdata.gender)
      UpdateStatus(data.userdata.status)
    })
  }, [])


  let router = useRouter()
  const UpdateData = async () => {
    let data = await axios.post("http://localhost:8080/update/data", {
      Uusername: Uusername,
      Uname: Uname,
      Ugender: Ugender,
      Ustatus: Ustatus
    }, { withCredentials: true })
    if (data.status === 200) {
      window.location.href = "/profile"
    }
  }
  const { UpdateModel, setUpdateModel } = useUserData()

  if (!UpdateModel) {
    return null
  }


  const Logout = async () => {
    const res = await axios.get("http://localhost:8080/logout", { withCredentials: true })
    if(res.data.success){
      router.push("/")
    }
  }


  return (
    <div className={`absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 customize w-4/5 sm:w-1/2 lg:w-1/3 rounded-xl h-9/10 bg-[#4b83769b] border border-zinc-700 rounded-md flex flex-col gap-5 p-3`}>
      <div className='flex justify-between items-center px-2'>
        <h1 className='text-black flex gap-3 items-center'><Pencil size={20} />Update</h1>
        <X size={23} color="#000" onClick={() => {
          setUpdateModel(false)
        }} className='rounded-md cursor-pointer active:scale-97 hover:bg-red-500' />
      </div>
      <input type="text" onChange={(e) => {
        UpdateUsername(e.target.value)

      }} value={Uusername} placeholder='Enter Username' className='w-full p-3 border border-black text-white rounded-xl outline-none' />
      <input type="text" onChange={(e) => {
        UpdateName(e.target.value)

      }} value={Uname} placeholder='Enter Name' className='w-full p-3 border border-black text-white rounded-xl outline-none' />

      <Gender onSelect={UpdateGender} selected={Ugender} />
      <Status onSelect={UpdateStatus} selected={Ustatus} />

      <button onClick={UpdateData} className='p-2 bg-white text-black rounded-md cursor-pointer active:scale-97'>Save</button>
      <button onClick={Logout} className='p-2 bg-red-700 rounded-md cursor-pointer active:scale-97'>Logout</button>
    </div>
  )
}

export default Customization