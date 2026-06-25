import React from 'react'
import OtherFriendsCard from './OtherFriendsCard'

const FriendsData = () => {
  return (
    <div className="friendsData grid h-4/5 grid-cols-4 gap-5 p-5 overflow-auto">
            <OtherFriendsCard/>
            <OtherFriendsCard/>
            <OtherFriendsCard/>
          </div>
  )
}

export default FriendsData