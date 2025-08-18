import { Toaster } from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { ThemeContext, useThemeProvider } from '../hooks/useTheme'
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
import { ThemeSwitch } from './ui/theme-switch'

const AppContent = () => {
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
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative">
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
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative">
      <ThemeSwitch />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass',
          style: {
            background: 'transparent',
            color: 'hsl(var(--text-50))',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }
        }}
      />

      <Card className="w-full max-w-md glass shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-text-50"
            >
              <path
                d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Gym Portal
          </CardTitle>
          <CardDescription className="text-text-400 text-base">
            Welcome back! Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-300 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-background-800/30 border-secondary-600/50 focus:border-primary-500 focus:ring-primary-500/20 placeholder:text-text-500"
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-text-300 font-medium">
                PIN Code
              </Label>
              <Input
                id="pincode"
                type="password"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your PIN"
                className="bg-background-800/30 border-secondary-600/50 focus:border-primary-500 focus:ring-primary-500/20 placeholder:text-text-500"
                required
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-text-50 font-semibold py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const App = () => {
  const themeProvider = useThemeProvider()

  return (
    <ThemeContext.Provider value={themeProvider}>
      <AppContent />
    </ThemeContext.Provider>
  )
}

export default App
