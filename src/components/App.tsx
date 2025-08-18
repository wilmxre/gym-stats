import { Toaster } from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

const App = () => {
  const {
    email,
    setEmail,
    pincode,
    setPincode,
    isLoading,
    userInfo,
    handleLogin,
    handleLogout
  } = useAuth()

  if (userInfo) {
    return (
      <div className="min-h-screen bg-background-950 flex items-center justify-center p-4">
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

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-text-50">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-primary-400">
              Member Dashboard
            </CardDescription>
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

            <div className="flex justify-center pt-4">
              <Badge
                variant="secondary"
                className="bg-secondary-700 text-accent-400 border-secondary-600"
              >
                Active Member
              </Badge>
            </div>

            <Button onClick={handleLogout} variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-950 flex items-center justify-center p-4">
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

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-text-50">
            Gym Member Portal
          </CardTitle>
          <CardDescription className="text-primary-400">
            Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-primary-400">
                PIN Code
              </Label>
              <Input
                id="pincode"
                type="password"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your PIN"
                required
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
