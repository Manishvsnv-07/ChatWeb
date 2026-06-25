'use client'

import { createContext, useContext, useState } from "react"
const UserContext = createContext(null)

export function UserChatProvider({ children }) {
  const [SelectedUser, setSelectedUser ] = useState('')

  return (
    <UserContext.Provider value={{ SelectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useChatUserData() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useChatUserData must be used inside UserChatProvider')
  }

  return context
}
