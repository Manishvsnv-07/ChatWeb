import React, { Suspense } from 'react'
import ProfileHeader from '../Profile-Components/ProfileHeader'
import AboutUsers from '../Profile-Components/AboutUsers'
import Customization from '../Login-Components/Customization'
import ProfileHeaderSkeleton from '../profile-skeleton/ProfileHeaderSkeleton'
const page = () => {
  return (
    <div className="relative main h-dvh w-full flex flex-col">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader />
      </Suspense>
      
      <AboutUsers />
      <Customization />
    </div>
  )
}

export default page
