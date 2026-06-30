'use client'
import { useChatUserData } from '@/context/UserChatContext'
import { getOptimizedImage } from '@/utils/cloudinary'
import { Link } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const OtherFriendsCard = ({ data }) => {
  const { setSelectedUser } = useChatUserData()
  const router = useRouter()
  return (
    <>
      <div
        onClick={() => {
          setSelectedUser(data),
            router.push("/chat")
        }
        }
        className='card h-15 px-5 py-2 bg-[#75d1bc54] rounded-md flex  justify-between items-center active:scale-99 cursor-pointer'
      >
        <div className='relative'>
        <div className='relative w-11 h-11 rounded-full'>
          <Image
            src={getOptimizedImage(data.avatar,{width:45,height:45})}
            fill
            sizes='45px'
            className='rounded-full object-cover'
            alt="UserPic"
          />
        </div>
        {data.isOnline?(<button className='absolute top-0 right-0 bg-green-400 brightness-150 rounded-full h-3 w-3'></button>):(null)}
          
        </div>
        <div>
          <h1>{data.username}</h1>
          <h1>{data.gender}</h1>
        </div>
        <div className='relative w-9 h-9 rounded-full'>
          <Image
            src={`https://flagcdn.com/w80/${data.countrycode}.png`}
            fill
            sizes='45px'
            className='rounded-full object-cover'
            alt="Country"
          />
        </div>
      </div>
    </>
  )
}

export default OtherFriendsCard