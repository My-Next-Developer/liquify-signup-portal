import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useContext(AuthContext)
    return user ? children : <Navigate to="/login" />
}
