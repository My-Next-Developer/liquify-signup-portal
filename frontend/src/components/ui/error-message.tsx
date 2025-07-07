import { XCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
    message: string
    variant?: 'error' | 'warning' | 'info'
    className?: string
    onDismiss?: () => void
}

export default function ErrorMessage({ message, variant = 'error', className, onDismiss }: ErrorMessageProps) {
    const getVariantConfig = () => {
        switch (variant) {
            case 'warning':
                return {
                    icon: AlertTriangle,
                    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                    iconClassName: 'text-yellow-600',
                }
            case 'info':
                return {
                    icon: Info,
                    className: 'bg-blue-50 border-blue-200 text-blue-800',
                    iconClassName: 'text-blue-600',
                }
            case 'error':
            default:
                return {
                    icon: XCircle,
                    className: 'bg-red-50 border-red-200 text-red-800',
                    iconClassName: 'text-red-600',
                }
        }
    }

    const config = getVariantConfig()
    const Icon = config.icon

    return (
        <div className={cn('flex items-start gap-3 p-4 border rounded-lg', config.className, className)}>
            <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', config.iconClassName)} />
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            {onDismiss && (
                <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <XCircle className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}
