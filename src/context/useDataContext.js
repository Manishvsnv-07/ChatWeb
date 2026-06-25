"use client"

import { createContext, useContext, useState } from "react"

const UseDataContext = createContext()


export function UseDataProvider({children}){
    const [UpdateModel, setUpdateModel] = useState(false)
    return (
    <UseDataContext.Provider value={{ UpdateModel, setUpdateModel }}>
      {children}
    </UseDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UseDataContext);
}