import React from 'react'
import Loginbox from './Loginbox'
import Ortext from './Ortext'
import Signup from './Signup'
import Image from 'next/image'


const UserDataCollect = () => {
  return (
    <div className="UserEntry relative z-11 w-full lg:w-1/3 sm:w-1/2 overflow-hidden">
  <Image
    src="/imgs/bg.webp"
    alt=""
    fill
    priority
    quality={80}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover -z-10"
  />
        <Loginbox/>
        <Ortext/>
        <Signup/>
      </div>
  )
}

export default UserDataCollect
