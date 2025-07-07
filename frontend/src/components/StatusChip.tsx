import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StatusChipProps {
    status: string
    className?: string
}

export default function StatusChip({ status, className }: StatusChipProps) {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return {
                    label: 'Approved',
                    variant: 'default' as const,
                    className: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
                }
            case 'REJECTED':
                return {
                    label: 'Rejected',
                    variant: 'destructive' as const,
                    className: '',
                }
            case 'PUSHBACK':
                return {
                    label: 'Pushback',
                    variant: 'secondary' as const,
                    className: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
                }
            case 'PENDING':
            default:
                return {
                    label: 'Pending',
                    variant: 'outline' as const,
                    className: 'text-gray-600 border-gray-300',
                }
        }
    }

    const config = getStatusConfig(status)

    return (
        <Badge variant={config.variant} className={cn(config.className, className)}>
            {config.label}
        </Badge>
    )
}
