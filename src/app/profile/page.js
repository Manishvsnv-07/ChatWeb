import React from 'react'
import ProfileHeader from '../Profile-Components/ProfileHeader'
import AboutUsers from '../Profile-Components/AboutUsers'
import Customization from '../Login-Components/Customization'
const page = () => {
  return (
    <div className="relative main h-screen w-full flex flex-col">
      <ProfileHeader/>
      <AboutUsers/>
      <Customization/>
    </div>
  )
}

export default page