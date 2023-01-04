import { createContext, useState, ReactNode } from 'react'

export const AuthContext = createContext({ isAuth: false, toggleAuth: () => {} })

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)

  const toggleAuth = () => {
    setIsAuth(!isAuth)
  }

  return <AuthContext.Provider value={{ isAuth, toggleAuth }}>{children}</AuthContext.Provider>
}
