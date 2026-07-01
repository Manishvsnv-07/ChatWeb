'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const s = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true
    })

    s.on("connect", () => {
      console.log('Connected Id : ', s.id)
      setSocket(s)
      setIsConnected(true)
    })

    s.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
      setIsConnected(false)
    })

    s.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message)
    })

    return () => {
      s.disconnect()
      setSocket(null)
      setIsConnected(false)
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)