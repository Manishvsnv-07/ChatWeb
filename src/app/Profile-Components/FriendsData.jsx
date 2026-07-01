import React, { useEffect, useState } from 'react'
import OtherFriendsCard from './OtherFriendsCard'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FriendsData = () => {
  const [FriendsData, setFriendsData] = useState([])
  const router = useRouter()

  useEffect(() => {
    const GetFriendsData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/FriendsData`,
          { withCredentials: true }
        )
        setFriendsData(res.data.FriendsData)
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login')
        }
      }
    }
    GetFriendsData()
  }, [])

  return (
    <div className="friendsData grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 overflow-auto">
      {FriendsData.map((data, i) => (
        <OtherFriendsCard data={data} key={i} />
      ))}
    </div>
  )
}

export default FriendsData