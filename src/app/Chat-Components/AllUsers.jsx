'use client'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { ChevronLeft, Search } from 'lucide-react'
import { getUsers } from '../../../Api-Services/AllUser'
import { getdata } from '../../../Api-Services/profileData'
import { useMessageNotify } from '@/context/MessageNotification'
import { useChatUserData } from '@/context/UserChatContext'
import axiosInstance from '@/utils/axiosInstance'
import { useDebounce } from './useDebounce'
import Link from 'next/link'
import AlluserSkeleton from '../Chat-Skeleton/AlluserSkeleton'
import { useSocket } from '@/context/SocketContext'


const AllUsers = () => {
  const [Users, setAllUsers] = useState([])
  const [myData, setmyData] = useState('')
  const socket = useSocket()
  const [query, setquery] = useState('')
  const [result, setresult] = useState([])
  const [loading, setloading] = useState(false)
  const { SelectedUser } = useChatUserData()
  const { setMessageLen ,Count,setCount} = useMessageNotify()
  const debouncedQuery = useDebounce(query, 500);

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    getUsers(1).then(data => {
      setAllUsers(data.AllUsers)
      setHasMore(data.hasMore)
      setInitialLoading(false)
    })

    getdata().then((d) => {
      setmyData(d.userdata)
    })
  }, [])

  const handleShowMore = async () => {
    const nextPage = page + 1
    setLoadingMore(true)
    const data = await getUsers(nextPage)
    setAllUsers(prev => [...prev, ...data.AllUsers])
    setHasMore(data.hasMore)
    setPage(nextPage)
    setLoadingMore(false)
  }

  useEffect(() => {
    if(!socket?.current) return

    socket.current.on("presence-update", (data) => {
      setAllUsers((prev) => prev.map((user) => {
        if (String(user._id) !== String(data.UserId)) return user

        return {
          ...user,
          isOnline: data.isOnline,
          lastSeen: data.lastSeen || user.lastSeen
        }
      }))
    })

    return () => {
      socket.current.off("presence-update")
    }
  }, [])

  useEffect(() => {
    if (!myData?._id) return;
    fetch(`http://localhost:8080/api/UnreadMsgData/${myData._id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        const counts = {}
        data.UnreadData.forEach(item => {
          counts[item._id] = item.unreadCount
        })
        setCount(counts)
        const totalUnread = data.UnreadData.reduce((sum, item) => sum + item.unreadCount, 0)
        setMessageLen(totalUnread)
      })

  }, [myData?._id])

  useEffect(() => {
    setloading(true)
    if (!debouncedQuery) {
      setresult([]);
      return;
    }

    const SearchUser = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8080/api/SearchedUser",
          {
            params: { query: debouncedQuery },
          })
        setresult(res.data.users)
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false)
      }
    }
    SearchUser()
  }, [debouncedQuery])

  if (!AllUsers) return <AlluserSkeleton />

  return (
    <div className={`Allusers ${SelectedUser ? 'hidden' : 'block'} sm:block w-full sm:w-1/2 lg:w-1/4 h-full border-r border-zinc-700 flex flex-col space-y-4 p-2 overflow-auto`}>
      <div className='flex gap-2 w-full'>
        <Link href={"/profile"}><button className='border border-zinc-800 py-2 px-2 hover:bg-zinc-800 cursor-pointer text-white'><ChevronLeft /></button></Link>
        <div className="search relative w-full h-11 flex items-center">
          <Search className='absolute top-1/2 -translate-y-1/2 left-2 text-gray-700' size={20} />
          <input type="text" placeholder='Search' value={query} onChange={(e) => {
            setquery(e.target.value)
          }} className='bg-black border border-zinc-700 text-white w-full h-full py-2 pl-9 outline-0' />
        </div>
      </div>
      {debouncedQuery ? (
        loading ? (
          <p className="text-zinc-500">Searching...</p>
        ) : result.length > 0 ? (
          result.map((data, i) => (
            <UserCard key={i} user={data} currentUser={myData} Count={Count} />
          ))
        ) : (
          <p className="text-zinc-500">No user found</p>
        )
      ) : initialLoading ? (
        Array.from({ length: 8 }).map((_, i) => <AlluserSkeleton key={i} />)
      ) : (
        Users.map((data, i) => (
          <UserCard key={i} user={data} currentUser={myData} />
        ))
      )}

      {hasMore && (
        <button
          onClick={handleShowMore}
          disabled={loadingMore}
          className="w-full py-2 text-sm text-zinc-400 border cursor-pointer border-zinc-700 hover:bg-zinc-800 transition disabled:opacity-50"
        >
          {loadingMore ? "Loading..." : "Show More"}
        </button>
      )}

      {!hasMore && Users.length > 0 && (
        <p className="text-center text-xs text-zinc-600 pb-2">No more users</p>
      )}

    </div>
  )
}

export default AllUsers
