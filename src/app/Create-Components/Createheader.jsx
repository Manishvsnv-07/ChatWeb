import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Createheader = () => {
  return (
    <div className='flex justify-between px-2 items-center'>
          <Link href={"/login"}><button className='bg-[#70d4a9db] py-1 px-1 hover:bg-[#9cebcf] cursor-pointer text-black'><ChevronLeft /></button></Link>
          <div className='py-1 px-2 font-semibold flex items-center gap-2'>
            <img
            src='/imgs/logo.png'
            className='w-9 h-9 rounded-full'
            alt='ChatWeb logo'
          />
          <span className='text-white font-semibold text-lg tracking-wide'>ChatWeb</span>
          </div>
          </div>
  )
}

export default Createheader