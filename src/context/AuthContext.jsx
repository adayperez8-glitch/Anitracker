import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Persiste la sesión en sessionStorage
    const saved = sessionStorage.getItem('anitracker-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (username, password) => {
    const validUser = import.meta.env.VITE_LOGIN_USERNAME
    const validPass = import.meta.env.VITE_LOGIN_PASSWORD

    if (username === validUser && password === validPass) {
      const userData = { username }
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
