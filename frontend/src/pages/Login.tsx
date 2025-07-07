import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ErrorMessage from '@/components/ui/error-message'
import { getErrorMessage, getErrorVariant } from '@/lib/error-handler'

export default function Login() {
    const { loginUser, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await loginUser(username, password)
            // Navigation will be handled by the useEffect when user state updates
        } catch (error) {
            console.error({ error })
            setError(getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    required
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
            {error && <ErrorMessage message={error} variant={getErrorVariant(error)} onDismiss={() => setError('')} />}
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up here
                </a>
            </p>
        </div>
    )
}
