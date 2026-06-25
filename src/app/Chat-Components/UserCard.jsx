'use client'
import { useMessageNotify } from '@/context/MessageNotification'
import { useChatUserData } from '@/context/UserChatContext'
import { useEffect, useState } from 'react'

const UserCard = ({ user, currentUser }) => {
  const { setSelectedUser } = useChatUserData()
  const [Count, setCount] = useState("")
  console.log(Count);
  

  useEffect(() => {
    fetch(`http://localhost:8080/api/UnreadMsgData/${currentUser._id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {

        const counts = {}
        data.UnreadData.forEach(item => {
          counts[item._id] = item.unreadCount
        })
        setCount(counts)
      })

  }, [currentUser])


  const ChatUser = () => {
    setSelectedUser(user)
    setCount(0)
  }
  return (
    String(currentUser._id) !== String(user._id) ? (
      <div onClick={ChatUser} className={`card w-full h-15 px-5 py-2 ${Count[user._id]>0?'bg-emerald-200':'bg-black`'} bg-black text-white border border-zinc-700 rounded-md flex justify-between items-center active:scale-99 cursor-pointer`}>
        <img src={user.avatar} className="w-11 h-11 rounded-full" alt="" />
        <div>
          <h1 className={Count[user._id]>0 ? 'text-black':'text-white'}>{user.username} {Count[user._id]>0? `(${Count[user._id]})`:(null)}</h1>
          <h1 className={Count[user._id]>0 ? 'text-black':'text-white'}>{user.gender}</h1>
        </div>
        <img src={`https://flagcdn.com/w40/${user.countrycode}.png`} className="w-7 h-7 rounded-full" alt="" />
      </div>
    ) : null
  )
}

export default UserCard
