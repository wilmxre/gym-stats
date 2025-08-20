import { Toaster } from 'react-hot-toast'
import { HeroKPIDashboard } from '../analytics'
import { UserMenu } from '../components/ui/user-menu'
import { useAuth } from '../hooks/useAuth'

export const DashboardPage = () => {
  const { userInfo } = useAuth()

  if (!userInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-background-950 p-4 relative">
      <span className="fixed top-8 right-8 z-50 flex items-center gap-2">
        <UserMenu />
      </span>

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
