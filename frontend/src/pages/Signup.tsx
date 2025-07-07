import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ErrorMessage from '@/components/ui/error-message'
import { apiFetch } from '../lib/api'
import { getErrorMessage, getErrorVariant } from '@/lib/error-handler'

interface FormData {
    username: string
    email: string
    password: string
}

export default function Signup() {
    const [form, setForm] = useState<FormData>({ username: '', email: '', password: '' })
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setIsLoading(true)

        try {
            const res = await apiFetch('/signup/', {
                method: 'POST',
                body: JSON.stringify(form),
            })
            const data = await res.json()

            if (res.ok) {
                setMessage('Signup successful! Please log in with your new account.')
            } else {
                setError(getErrorMessage({ response: { data, status: res.status } }))
            }
        } catch (error) {
            setError(getErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input name="username" id="username" onChange={handleChange} placeholder="Username" required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" onChange={handleChange} placeholder="Email" required />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" id="password" onChange={handleChange} placeholder="Password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Register'}
                </Button>
            </form>
            {message && <p className="mt-2 text-center text-sm text-green-700">{message}</p>}
            {error && <ErrorMessage message={error} variant={getErrorVariant(error)} onDismiss={() => setError('')} />}
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                    Login here
                </a>
            </p>
        </div>
    )
}
