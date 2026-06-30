import React from 'react'
import FriendsData from './FriendsData'
import MyFriendsHead from './MyFriendsHead'

const MyFriends = () => {
  return (
    <div className="MyFriends h-1/2 bg-white overflow-auto text-black">
          <MyFriendsHead/>
          <FriendsData/>
        </div>
  )
}

export default MyFriends