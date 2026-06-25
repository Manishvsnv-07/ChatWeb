import Link from 'next/link'
import React from 'react'

const Signup = () => {
    return (
        <div className="Signup flex flex-col gap-5 p-3 text-black">
            <Link href={'/CreateAccount'}><button className='p-2 bg-[#ffffffae] w-full border border-white rounded-md active:brightness-150 active:scale-99 cursor-pointer'>Create Account</button></Link>
            <button className='p-2 bg-[#ffffffae] border border-white rounded-md active:brightness-150 active:scale-99 cursor-pointer'>Google</button>
        </div>
    )
}

export default Signup