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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0b0a0f',
              color: '#f2f0f5',
              border: '1px solid #5f3f54'
            }
          }}
        />

        <Card className="w-full max-w-md bg-background border-secondary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-text">Welcome Back!</CardTitle>
            <CardDescription className="text-primary">
              Member Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg border border-secondary">
              <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-background font-bold text-lg">
                {userInfo.fname[0]}
                {userInfo.lname[0]}
              </div>
              <div>
                <h3 className="font-semibold text-text">
                  {userInfo.fname} {userInfo.lname}
                </h3>
                <p className="text-sm text-primary">{userInfo.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-primary">Member ID</Label>
                <p className="text-text font-mono">{userInfo.id}</p>
              </div>
              <div>
                <Label className="text-primary">Club ID</Label>
                <p className="text-text font-mono">{userInfo.clubid}</p>
              </div>
              <div>
                <Label className="text-primary">Location</Label>
                <p className="text-text">
                  {userInfo.city}, {userInfo.country}
                </p>
              </div>
              <div>
                <Label className="text-primary">Phone</Label>
                <p className="text-text">{userInfo.mobile_phone}</p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Badge
                variant="secondary"
                className="bg-secondary/30 text-accent border-secondary"
              >
                Active Member
              </Badge>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-secondary text-primary hover:bg-secondary/20 hover:text-text"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0b0a0f',
            color: '#f2f0f5',
            border: '1px solid #5f3f54'
          }
        }}
      />

      <Card className="w-full max-w-md bg-background border-secondary">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-text">
            Gym Member Portal
          </CardTitle>
          <CardDescription className="text-primary">
            Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-secondary/20 border-secondary text-text placeholder:text-primary focus:border-accent"
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-primary">
                PIN Code
              </Label>
              <Input
                id="pincode"
                type="password"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your PIN"
                className="bg-secondary/20 border-secondary text-text placeholder:text-primary focus:border-accent"
                required
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/80 text-background font-semibold"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
