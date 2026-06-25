'use client'
import { EllipsisVertical, Eye, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useChatUserData } from '@/context/UserChatContext'
import Link from 'next/link'
import { io } from 'socket.io-client'
import { getdata } from '../../../Api-Services/profileData'

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
  const socket = useRef(null)
  const typingTimeout = useRef(null)
  const roomIdRef = useRef('')
  const currentUserIdRef = useRef('')
  const [currentUser, setcurrentUser] = useState('')
  const [message, setmessage] = useState('')
  const [Messages, setMessages] = useState([])
  console.log('Messages : ', Messages);

  const [Typing, setTyping] = useState(false)
  console.log(Typing);

  const [roomId, setroomId] = useState('')
  const { SelectedUser } = useChatUserData()

  const [Active, setActive] = useState(false)
  const [lastSeen, setLastSeen] = useState(null)
  const visibleMessages = Messages.filter((msg) => msg.roomId === roomId)

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

    socket.current = io('http://localhost:8080', {
      withCredentials: true,
      autoConnect: true,
      reconnection: true
    })
    socket.current.on("connect", () => {
      console.log('Connected Id : ', socket.current.id);
    })
    socket.current.on("receive-message", (data) => {
      console.log(data);
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

    fetch(`http://localhost:8080/messages/${rid}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.message));




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

  return (
    <>

      {SelectedUser ? (
        <div className='w-3/4 border border-black'>
          <div className="UserHeader w-full h-1/10 flex text-white border-b border-zinc-700 justify-between items-center px-2">
            <Link href={`/Clickedprofile/${SelectedUser.username}`}><div className='UserData flex gap-4 items-center'>
              <img src={SelectedUser.avatar} className='w-11 h-11 rounded-full' alt="" />
              <div>
                <h1 className='text-xl'>{SelectedUser ? `@${SelectedUser.username}` : 'Select user'}</h1>
                {Typing ? (<button className='text-green-400'>Typing...</button>) : (<h2 className={Active ? 'text-green-400' : 'text-gray-500'}>{Active ? 'Active' : getLastSeenText(lastSeen)}</h2>)}

              </div>
            </div></Link>
            <EllipsisVertical />
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
                
                {/* Seen indicator — sirf apne last message pe dikhao */}
                  {isMine && isLastMessage && (
                    <span className="flex justify-end text-white">
                      {msg.read ?  <span className='flex gap-1 text-xs'><Eye size={15} />Seen</span> : <span className='flex gap-2 text-xs'><SendHorizontal size={15} />Sent</span>}
                    </span>
                  )}
                 </React.Fragment>  
              )

            })}

          </div>


          <div className="Sendchat relative w-full h-1/10  pb-1 px-2 flex">
            <input value={message} onChange={(e) => {
              setmessage(e.target.value)
              TypingMessage()
            }} onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) setMessage()
            }} type="text" placeholder='Start Chat' className='w-full bg-black border border-zinc-700 text-white h-full rounded-md px-2 outline-0' />
            <SendHorizontal onClick={setMessage} className='absolute w-9 h-9 top-1/2 -translate-y-1/2 right-4 text-white rounded-md p-1 active:scale-95 cursor-pointer' />
          </div>
        </div>) :


        (<div className='w-3/4 border bg-[url(/imgs/Chatsection.png)] bg-cover bg-center border-black'>

        </div>)}
    </>

  )
}

export default ChatSection
