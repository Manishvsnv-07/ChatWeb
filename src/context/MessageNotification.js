'use client'
import { createContext, useContext, useState } from "react";

const MessageNotification = createContext(null)

export function MessageProvider({ children }){
    const [MessageLen, setMessageLen] = useState("")
    const [Count, setCount] = useState({})
    return(
        <MessageNotification.Provider value={{MessageLen,setMessageLen,Count,setCount}}>
            {children}
        </MessageNotification.Provider>
    )
}

export function useMessageNotify(){
    const MsgContext = useContext(MessageNotification)
    return MsgContext
}