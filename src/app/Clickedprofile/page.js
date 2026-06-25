import React from 'react'
import Customization from '../Login-Components/Customization'
import ClickedProfileHeader from '../ClickedProfile-Componenets/ClickedProfileHeader'
import ClickedUserDetail from '../ClickedProfile-Componenets/ClickedUserDetail'

const page = () => {
  return (
    <div className="relative main h-screen w-full flex flex-col">
      <ClickedProfileHeader/>
      <ClickedUserDetail/>
      <Customization/>
    </div>
  )
}

export default page