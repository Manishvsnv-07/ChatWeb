import React from 'react'
import AllUsers from '../Chat-Components/AllUsers'
import ChatSection from '../Chat-Components/ChatSection'

const page = () => {
  return (
    <div className='w-full h-dvh bg-black flex'>
       <AllUsers/>
       <ChatSection/> 
    </div>
  )
}

export default page
