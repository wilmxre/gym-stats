import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HeroKPIDashboard } from '../analytics'
import { ThemeSwitch } from '../components/ui/theme-switch'
import { UserMenu } from '../components/ui/user-menu'
import { useAuth } from '../hooks/useAuth'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { userInfo, handleLogout } = useAuth()

  if (!userInfo) {
    return null
  }

  return (
    <div className="min-h-screen mesh-gradient-bg p-4 relative">
      <ThemeSwitch />
      <UserMenu />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(224 71.4% 4.1%)',
            color: 'hsl(210 20% 98%)',
            border: '1px solid hsl(215 19% 35%)'
          }
        }}
      />

      <div className="max-w-7xl mx-auto pt-20">
        <HeroKPIDashboard />
      </div>
    </div>
  )
}
