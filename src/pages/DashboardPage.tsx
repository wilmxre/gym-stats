import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { ThemeSwitch } from '../components/ui/theme-switch'
import { useAuth } from '../hooks/useAuth'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { userInfo, handleLogout } = useAuth()

  if (!userInfo) {
    return null
  }

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4 relative">
      <ThemeSwitch />
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

      <Card className="w-full max-w-md bg-background-900 border border-secondary-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-text-50">
            Your information
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

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/checkins')}
              variant="default"
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              View Check-ins
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
