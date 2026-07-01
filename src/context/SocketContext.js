'use client'
import { createContext, useContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true
    })

    return () => {
      socket.current.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
