"use client"
import React, { createContext, useContext, useEffect } from "react"
import { verifySession } from "@/lib/utils/session"

const userContextInitial = {
  isAuthenticated: false,
}

const UserContext = createContext<typeof userContextInitial>(userContextInitial)

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  useEffect(() => {
    async function getAuthStatus() {
      const authorized = await verifySession()
      setIsAuthenticated(authorized)
    }
    void getAuthStatus()
  }, [])

  return <UserContext.Provider value={{ isAuthenticated }}>{children}</UserContext.Provider>
}

export default UserContextProvider

export function useUser() {
  return useContext(UserContext)
}
