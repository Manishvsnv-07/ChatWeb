'use client'
import { ChevronLeft, EllipsisVertical, Eye, SendHorizontal, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useChatUserData } from '@/context/UserChatContext'
import Link from 'next/link'
import { getdata } from '../../../Api-Services/profileData'
import axios from 'axios'
import Image from 'next/image'
import ChatSectionSkeleton from '../Chat-Skeleton/ChatSectionSkeleton'
import { useSocket } from '@/context/SocketContext'
import { useMessageNotify } from '@/context/MessageNotification'
import { getOptimizedImage } from '@/utils/cloudinary'
import EmptyChatState from './EmptyChatState'

const getLastSeenText = (lastSeen) => {
  if (!lastSeen) return 'Offline'

  const diffMs = Date.now() - new Date(lastSeen).getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'Active just now'
  if (diffMin < 60) return `Active ${diffMin}m ago`

  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `Active ${diffHour}h ago`

  const diffDay = Math.floor(diffHour / 24)
  return `Active ${diffDay}d ago`
}

const ChatSection = () => {
  const socket = useSocket()
  const typingTimeout = useRef(null)
  const roomIdRef = useRef('')
  const currentUserIdRef = useRef('')
  const [currentUser, setcurrentUser] = useState('')
  const [message, setmessage] = useState('')
  const [Messages, setMessages] = useState([])
  const [Typing, setTyping] = useState(false)
  const [roomId, setroomId] = useState('')
  const { SelectedUser, setSelectedUser } = useChatUserData()
  const [Active, setActive] = useState(false)
  const [lastSeen, setLastSeen] = useState(null)
  const visibleMessages = Messages.filter((msg) => msg.roomId === roomId)
  const { Count, setCount, MessageLen, setMessageLen } = useMessageNotify()
  const isFriendBase = useMemo(() => {
    if (!currentUser?.Friends || !SelectedUser?._id) return false;
    return currentUser.Friends.some(id => id.toString() === SelectedUser._id.toString())
  }, [currentUser?.Friends, SelectedUser?._id])

  const [isFriend, setIsFriend] = useState(false)
  const [ChatLoading, setChatLoading] = useState(true)
  const bottomRef = useRef(null)


  useEffect(() => {
    setIsFriend(isFriendBase)
  }, [isFriendBase])

  useEffect(() => {
    roomIdRef.current = roomId
  }, [roomId])

  useEffect(() => {
    currentUserIdRef.current = currentUser?._id || ''
  }, [currentUser])

  useEffect(() => {
    getdata().then((data) => {
      setcurrentUser(data.userdata)
    })
  }, [])

  useEffect(() => {
    if (!SelectedUser) return
    setChatLoading(true)
  }, [currentUser, SelectedUser])


  useEffect(() => {
    if (!socket?.current) return

    socket.current.on("connect", () => {
      console.log('Connected Id : ', socket.current.id);
    })
    socket.current.on("receive-message", (data) => {
      setMessages((prev) => {
        const Updated = [...prev, data]
        return Updated
      })
    })

    socket.current.on("message-seen", (data) => {
      if (data.roomId !== roomIdRef.current) return

      setMessages((prev) =>
        prev.map((msg) =>
          msg.senderId === currentUser?._id
            ? { ...msg, read: true }
            : msg
        )
      )

    })

    socket.current.on("Typing-receive", (data) => {
      if (data.roomId !== roomIdRef.current) return
      if (String(data.senderId) === String(currentUserIdRef.current)) return

      setTyping(true)

      clearTimeout(typingTimeout.current)
      typingTimeout.current = setTimeout(() => {
        setTyping(false)
      }, 1500)
    })

    socket.current.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    return () => {
      clearTimeout(typingTimeout.current)
      socket.current.disconnect()
    }

  }, [])


  useEffect(() => {
    if (!currentUser?._id || !socket.current) return

    socket.current.emit("user-active", currentUser._id)
  }, [currentUser])


  useEffect(() => {
    if (!socket.current) return

    socket.current.on("presence-update", (data) => {
      if (String(data.UserId) !== String(SelectedUser?._id)) return

      setActive(data.isOnline)
      setLastSeen(data.lastSeen || null)
    })

    return () => {
      socket.current.off("presence-update")
    }
  }, [SelectedUser])


  useEffect(() => {
    setActive(Boolean(SelectedUser?.isOnline))
    setLastSeen(SelectedUser?.lastSeen || null)
  }, [SelectedUser])



  useEffect(() => {

    if (!currentUser?._id || !SelectedUser?._id || !socket.current) return

    const rid = [currentUser._id, SelectedUser._id].sort().join("_")
    setroomId(rid)
    setTyping(false)

    socket.current.emit("join-room", {
      roomId: rid,
      currentUserId: currentUser._id,
      SelectedUserId: SelectedUser._id
    })
    setCount(prev => ({ ...prev, [SelectedUser._id]: 0 }))
    setMessageLen(prev => ({ ...prev, [SelectedUser._id]: 0 }))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${rid}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.message)
        setChatLoading(false)
      });

  }, [currentUser, SelectedUser])


  const setMessage = () => {
    if (!message.trim() || !roomId || !currentUser?._id || !SelectedUser?._id || !socket.current) return

    const messageData = {
      roomId,
      senderId: currentUser._id,
      receiverId: SelectedUser._id,
      text: message,
      createdAt: new Date()
    }

    socket.current.emit("send-message", messageData, (savedMessage) => {
      setMessages((prev) => [...prev, savedMessage]),
        setmessage("")
    })
  }

  const TypingMessage = () => {
    if (!currentUser?._id || !SelectedUser?._id || !socket.current) return

    const typingRoomId = roomId || [currentUser._id, SelectedUser._id].sort().join("_")

    socket.current.emit("typing-message", {
      roomId: typingRoomId,
      senderId: currentUser._id,
      receiverId: SelectedUser._id
    })
  }


  const handleFriend = async () => {
    setIsFriend(prev => !prev)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Addfriend`, {
        SelectedUser: SelectedUser
      }, { withCredentials: true })
      setIsFriend(res.data.Friend)
    } catch (error) {
      setIsFriend(prev => !prev)
    }

  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleMessages])


  const formatTime = (createdAt) => {
    if (!createdAt) return ''
    const date = new Date(createdAt)
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const [ShowUser, setShowUser] = useState(false)
  const popupRef = useRef(null)


  const ToggleUserDetail = () => {
    setShowUser(prev => !prev)
  }

  useEffect(() => {
    setShowUser(false)
  }, [SelectedUser])


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowUser(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <>
      {SelectedUser ? (
        ChatLoading ? (
          <ChatSectionSkeleton />
        ) :
          <div className={`relative ${SelectedUser ? 'block' : 'hidden'} w-full sm:w-3/4  border border-black`}>
            <div className="UserHeader w-full h-1/10 flex gap-4 text-white border-b border-zinc-700 justify-between items-center px-5">
              <div onClick={ToggleUserDetail} className='cursor-pointer flex gap-4'>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setSelectedUser(null)
                  setShowUser(false)
                }} className='block sm:hidden border border-zinc-800 py-3 px-2 hover:bg-zinc-800 cursor-pointer'>
                  <ChevronLeft />
                </button>
                <div className='UserData flex gap-4 items-center'>
                  <div className='relative w-11 h-11 rounded-full'>
                    <Image
                      src={SelectedUser.avatar}
                      fill
                      sizes='40px'
                      className='rounded-full object-cover'
                      alt="UserAvatar"
                    />
                  </div>
                  <div>
                    <h1 className='text-xl'>{SelectedUser ? `@${SelectedUser.username}` : 'Select user'}</h1>
                    {Typing ? (<button className='text-green-400'>Typing...</button>) : (<h2 className={Active ? 'text-green-400' : 'text-gray-500'}>{Active ? 'Active' : getLastSeenText(lastSeen)}</h2>)}

                  </div>
                </div>
              </div>
              <div className='flex gap-5 items-center'>
                {
                  isFriend ? (<UserRoundCheck onClick={handleFriend} className='active:scale-95 cursor-pointer' />) :
                    (<UserRoundPlus onClick={handleFriend} className='active:scale-95 cursor-pointer' />)
                }
              </div>
            </div>

            <div ref={popupRef} className={`${ShowUser ? 'block' : 'hidden'} absolute top-20 left-1/2 -translate-x-1/2 w-9/10  md:w-7/10 lg:w-1/2 bg-zinc-950 rounded-xl border border-zinc-500 p-2`}>
              <div className='w-full flex justify-center items-center'>
                <div className='relative h-24 w-24 rounded-full'>
                  <Image
                    src={getOptimizedImage(SelectedUser.avatar, { width: 96, height: 96 })}
                    fill
                    sizes='96px'
                    quality={100}
                    className='rounded-full object-cover'
                    alt=""
                  />
                </div>
              </div>
              <div className='w-full flex flex-col gap-2 p-2'>
                <button className='w-full h-11 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-semibold'>Name : Manish Vaishnav</button>
                <button className='w-full h-11 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-semibold'>Username : Manish_M7</button>
                <button className='w-full h-11 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-semibold'>Gender : Male</button>
                <button className='w-full h-11 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-semibold flex justify-center items-center gap-2'>Country : <span>{SelectedUser.country}</span><img src={`https://flagcdn.com/w40/${SelectedUser.countrycode}.png`} className='h-6 w-6 rounded-full object-cover' alt="" /></button>
                <button className='w-full h-11 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-semibold'>Status : Single</button>
              </div>
            </div>

            <div className="w-full h-4/5 p-4 overflow-auto flex flex-col gap-2">
              {visibleMessages.map((msg, index) => {
                const isLastMessage = index === visibleMessages.length - 1
                const isMine = msg.senderId === currentUser?._id
                return (
                  <React.Fragment key={msg._id}>
                    <div
                      key={msg._id}
                      className={`max-w-1/2 px-3 py-2 rounded-md text-black ${msg.senderId === currentUser?._id
                        ? "bg-[#71cbb8] self-end"
                        : "bg-white self-start"
                        }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-[10px] mt-1 ${isMine ? 'text-right text-zinc-700' : 'text-left text-zinc-400'}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                    {isMine && isLastMessage && (
                      <span className="flex justify-end text-white">
                        {msg.read ? <span className='flex gap-1 text-xs'><Eye size={15} />Seen</span> : <span className='flex gap-2 text-xs'><SendHorizontal size={15} />Sent</span>}
                      </span>
                    )}
                  </React.Fragment>
                )

              })}

              <div ref={bottomRef} />

            </div>


            <div className="Sendchat relative w-full h-1/10  pb-1 px-2 flex">
              <input maxLength={500} value={message} onChange={(e) => {
                setmessage(e.target.value)
                TypingMessage()
              }} onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) setMessage()
              }} type="text" placeholder='Start Chat' className='w-full bg-black border border-zinc-700 text-white h-full rounded-md px-2 outline-0' />
              <SendHorizontal onClick={setMessage} className='absolute w-9 h-9 top-1/2 -translate-y-1/2 right-4 text-white rounded-md p-1 active:scale-95 cursor-pointer' />
            </div>
          </div>) :


        (<EmptyChatState/>)}
    </>

  )
}

export default ChatSection

