import Link from 'next/link'
import React from 'react'

const Main = () => {
  return (
    <div className='h-dvh w-full flex justify-center items-center'>
        <div className='rounded-md w-sm h-1/2 flex flex-col justify-center items-center gap-5 p-2'>
            <img src="/imgs/logo.png" className='rounded-full w-21 h-21' alt="" />
            <Link href={'/login'} className='w-full'><button className='bg-white rounded-md p-2 text-black active:bg-[#ffffffb9] cursor-pointer w-full'>Login</button></Link>
            <Link href={'/CreateAccount'} className='w-full'><button className='bg-white rounded-md p-2 text-black active:bg-[#ffffffb9] cursor-pointer w-full'>Create Account</button></Link>
        </div>
    </div>
  )
}

export default Main
