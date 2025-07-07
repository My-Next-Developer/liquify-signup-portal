import { useState, useRef, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import ErrorMessage from '@/components/ui/error-message'
import { apiClient } from '../lib/api'
import { getErrorMessage, getErrorVariant } from '@/lib/error-handler'

export default function UploadForm({ onUpload }: { onUpload?: () => void }) {
    const [file, setFile] = useState<File | null>(null)
    const [docType, setDocType] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async () => {
        if (!file || !docType) return
        const formData = new FormData()
        formData.append('file', file)
        formData.append('doc_type', docType)
        setLoading(true)
        setError('')

        try {
            await apiClient.post('/upload-doc/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            setFile(null)
            setDocType('')
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            if (onUpload) onUpload()
        } catch (err) {
            console.error(err)
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Document Type</Label>
                <Select onValueChange={setDocType} value={docType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PASSPORT">Passport</SelectItem>
                        <SelectItem value="PROOF_OF_ADDRESS">Proof of Address</SelectItem>
                        <SelectItem value="ID_CARD">ID Card</SelectItem>
                        <SelectItem value="LICENSE">Drivers License</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Upload File</Label>
                <Input ref={fileInputRef} type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
            </div>
            <Button onClick={handleUpload} disabled={loading || !file || !docType}>
                {loading ? 'Uploading...' : 'Upload'}
            </Button>
            {error && <ErrorMessage message={error} variant={getErrorVariant(error)} onDismiss={() => setError('')} />}
        </div>
    )
}
