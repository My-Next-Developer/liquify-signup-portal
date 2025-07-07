import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { LogOut } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import logo from '@/assets/logo.svg'

export default function NavBar() {
    const { logoutUser, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()
        navigate('/login')
    }

    return (
        <TooltipProvider>
            <nav className="w-full h-32 flex items-center border-b px-4 relative" style={{ backgroundColor: 'rgb(24, 32, 41)', height: '6rem' }}>
                {/* Centered logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={logo} alt="Logo" className="h-8" />
                </div>
                {/* Logout button on the right - only show when user is logged in */}
                {user && (
                    <div className="ml-auto">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={handleLogout} className="bg-transparent hover:bg-white/10 text-white border-none">
                                    <LogOut color="white" className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}
            </nav>
        </TooltipProvider>
    )
}
