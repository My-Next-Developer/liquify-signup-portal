import { createContext, useState, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { apiFetch } from '../lib/api'

interface AuthTokens {
    access: string
    refresh: string
}

interface User {
    username: string
    email: string
    exp: number
    iat: number
}

interface AuthContextType {
    user: User | null
    authTokens: AuthTokens | null
    loginUser: (email: string, password: string) => Promise<void>
    logoutUser: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null
    )
    const [user, setUser] = useState<User | null>(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')!) : null))

    const loginUser = async (username: string, password: string) => {
        const res = await apiFetch('/token/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })
        const data = await res.json()
        if (res.ok) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            throw new Error(data.detail || 'Login failed')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    const contextData = { user, authTokens, loginUser, logoutUser }

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export default AuthContext
