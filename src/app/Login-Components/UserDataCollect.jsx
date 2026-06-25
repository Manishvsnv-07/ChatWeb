import React from 'react'
import Loginbox from './Loginbox'
import Ortext from './Ortext'
import Signup from './Signup'


const UserDataCollect = () => {
  return (
    <div className="UserEntry m-3 bg-[url('/imgs/bg.jpg')] bg-cover bg-center z-11 w-1/3 rounded-xl overflow-hidden">
        <Loginbox/>
        <Ortext/>
        <Signup/>
      </div>
  )
}

export default UserDataCollect