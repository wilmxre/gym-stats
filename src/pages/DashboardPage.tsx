import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HeroKPIDashboard } from '../analytics'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
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

        {/* Quick Actions & User Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Quick Actions */}
          <Card className="bg-background-900 border-secondary-700">
            <CardHeader>
              <CardTitle className="text-xl text-text-50">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/checkins')}
                variant="default"
                className="w-full bg-primary-600 hover:bg-primary-700"
              >
                View Detailed Check-ins
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card className="bg-background-900 border-secondary-700">
            <CardHeader>
              <CardTitle className="text-xl text-text-50">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-secondary-800 rounded-lg border border-secondary-600">
                <div className="h-12 w-12 bg-accent-600 rounded-full flex items-center justify-center text-text-50 font-bold text-lg">
                  {userInfo.fname[0]}
                  {userInfo.lname[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-text-50">
                    {userInfo.fname} {userInfo.lname}
                  </h3>
                  <p className="text-sm text-primary-400">{userInfo.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-primary-400">Member ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.id}</p>
                </div>
                <div>
                  <Label className="text-primary-400">Club ID</Label>
                  <p className="text-text-50 font-mono">{userInfo.clubid}</p>
                </div>
                <div>
                  <Label className="text-primary-400">Location</Label>
                  <p className="text-text-50">
                    {userInfo.city}, {userInfo.country}
                  </p>
                </div>
                <div>
                  <Label className="text-primary-400">Phone</Label>
                  <p className="text-text-50">{userInfo.mobile_phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
