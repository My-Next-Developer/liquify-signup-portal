import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './utils/PrivateRoute'
import Signup from './pages/Signup'
import { AuthProvider } from './contexts/AuthContext'
import PageLayout from './components/PageLayout'
import { useEffect } from 'react'

export default function App() {
    useEffect(() => {
        // Force light mode
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
    }, [])

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <PageLayout>
                                <Signup />
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PageLayout>
                                <Login />
                            </PageLayout>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <PageLayout>
                                    <Dashboard />
                                </PageLayout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}
