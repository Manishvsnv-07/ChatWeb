import React from 'react'
import Loginbox from './Loginbox'
import Ortext from './Ortext'
import Signup from './Signup'


const UserDataCollect = () => {
  return (
    <div className="UserEntry bg-[url('/imgs/bg.jpg')] bg-cover bg-center z-11 w-full lg:w-1/3 sm:w-1/2  overflow-hidden">
        <Loginbox/>
        <Ortext/>
        <Signup/>
      </div>
  )
}

export default UserDataCollect