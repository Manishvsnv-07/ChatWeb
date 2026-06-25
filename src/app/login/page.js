import React from 'react'
import Sideview from '../Login-Components/Sideview'
import UserDataCollect from '../Login-Components/UserDataCollect'

const page = () => {
  return (
    <div className="main h-screen w-full flex justify-center bg-[#8ee4cdc3] ">
      <Sideview/>
      <UserDataCollect/>
    </div>
  )
}

export default page