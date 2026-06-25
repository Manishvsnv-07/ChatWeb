import Link from 'next/link'
import React from 'react'

const ClickedProfileHeader = () => {
  return (
    <div className="header w-full h-15 bg-[#75d1bc9b] flex items-center justify-between p-5">
        <div className='flex items-center justify-center gap-7'>
        <img src="/imgs/logo.png" className='w-11 h-11 rounded-full' alt="" />
        <Link href={'/chat'}><button className='bg-white py-2 px-4 rounded-2xl flex gap-2 active:scale-99 cursor-pointer text-black'>Start Chat</button></Link>
        </div>
        <div className='flex items-center justify-center gap-7'>
        <button className='bg-white py-2 px-4 rounded-2xl flex items-center justify-center gap-2 active:scale-99 cursor-pointer text-black'>Customize</button>
        <Link href={'/login'}><img src="/imgs/default.png" className='w-8 h-8 rounded-full' alt="" /></Link>
        </div>
      </div>
  )
}

export default ClickedProfileHeader