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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-20">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-50 mb-2">
            Welcome back, {userInfo.fname}!
          </h1>
          <p className="text-text-300">Here's your gym performance overview</p>
        </div>

        {/* Hero KPIs Dashboard */}
        <HeroKPIDashboard />
      </div>
    </div>
  )
}
