import type { ReactNode } from 'react'
import NavBar from './NavBar'

interface PageLayoutProps {
    children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className={'h-[calc(100vh-6rem)] flex items-center justify-center min-h-screen'}>{children}</main>
        </div>
    )
}
