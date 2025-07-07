import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { apiClient } from '../lib/api'
import AuthContext from '../contexts/AuthContext'
import FormUpload from '../components/FormUpload'
import StatusChip from '../components/StatusChip'

interface User {
    username: string
    email: string
    application_status: string
    pushback_reason?: string
}

interface Document {
    id: number
    doc_type: string
    uploaded_at: string
}

export default function Dashboard() {
    const { user: authUser } = useContext(AuthContext)
    const [user, setUser] = useState<User | null>(null)
    const [documents, setDocuments] = useState<Document[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!authUser) {
            navigate('/login')
            return
        }

        apiClient
            .get('/me/')
            .then((res) => setUser(res.data))
            .catch(() => navigate('/login'))

        apiClient.get('/documents/').then((res) => setDocuments(res.data))
    }, [navigate, authUser])

    const refreshDocuments = async () => {
        const res = await apiClient.get('/documents/')
        setDocuments(res.data)
    }

    async function handleDelete(id: number) {
        await apiClient.patch(`/documents/${id}/delete/`, {})
        await refreshDocuments()
    }

    return (
        <div className="p-6 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold">Welcome, {user?.username}</h2>
                    {user?.application_status && <StatusChip status={user.application_status} />}
                </div>
                <p className="text-gray-600">Email: {user?.email}</p>
                {user?.pushback_reason && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                            <strong>Pushback Reason:</strong> {user.pushback_reason}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-4">
                <h3 className="text-xl font-semibold">Upload New Document</h3>
                <FormUpload onUpload={refreshDocuments} />
            </div>

            <div>
                <h3 className="text-xl font-semibold mt-6 mb-2">Your Documents</h3>
                <ul className="space-y-2">
                    {documents.map((doc) => (
                        <li key={doc.id} className="border p-3 rounded shadow flex justify-between items-center">
                            <div>
                                <p className="font-medium">Type: {doc.doc_type}</p>
                                <p className="text-sm text-gray-500">Uploaded: {new Date(doc.uploaded_at).toLocaleString()}</p>
                            </div>
                            <Button variant="destructive" onClick={() => handleDelete(doc.id)}>
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
