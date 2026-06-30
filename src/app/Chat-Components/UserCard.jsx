'use client'
import { useMessageNotify } from '@/context/MessageNotification'
import { useChatUserData } from '@/context/UserChatContext'
import Image from 'next/image'

const UserCard = ({ user, currentUser }) => {
  const { SelectedUser, setSelectedUser } = useChatUserData()
  const {Count,setCount} = useMessageNotify()

  const ChatUser = () => {
    setSelectedUser(user)
  }
  return (
    String(currentUser._id) !== String(user._id) ? (
      <div onClick={ChatUser} className={`card w-full h-15 px-5 py-2 ${Count[user._id] > 0 ? 'bg-emerald-200' : 'bg-black`'} bg-black text-white border border-zinc-700 rounded-md flex justify-between items-center active:scale-99 cursor-pointer`}>
        <div className='relative w-11 h-11 rounded-full'>
          <Image
            src={user.avatar}
            fill
            sizes='40px'
            className="rounded-full object-cover"
            alt="UserAvatar"
            priority={true}
          />
        </div>
        <div>
          <h1 className={Count[user._id] > 0 ? 'text-black' : 'text-white'}>{user.username} {Count[user._id] > 0 ? `(${Count[user._id]})` : (null)}</h1>
          <h1 className={Count[user._id] > 0 ? 'text-black' : 'text-white'}>{user.gender}</h1>
        </div>
        <div className='relative h-7 w-7 rounded-full'>
          <Image
            src={`https://flagcdn.com/w40/${user.countrycode}.png`}
            fill
            sizes='40px'
            className="rounded-full object-cover"
            alt="UserCountry" />
        </div>
      </div>
    ) : null
  )
}

export default UserCard

