import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS = [
  {
    username: import.meta.env.VITE_LOGIN_USERNAME,
    password: import.meta.env.VITE_LOGIN_PASSWORD,
  },
  {
    username: import.meta.env.VITE_LOGIN_USERNAME_2,
    password: import.meta.env.VITE_LOGIN_PASSWORD_2,
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('anitracker-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      const userData = { username: found.username }
      setUser(userData)
      sessionStorage.setItem('anitracker-user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('anitracker-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}