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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'dark:bg-slate-800 dark:text-white'
          }}
        />

        <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back!</CardTitle>
            <CardDescription className="text-slate-300">
              Member Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {userInfo.fname[0]}
                {userInfo.lname[0]}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {userInfo.fname} {userInfo.lname}
                </h3>
                <p className="text-sm text-slate-300">{userInfo.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-slate-400">Member ID</Label>
                <p className="text-white font-mono">{userInfo.id}</p>
              </div>
              <div>
                <Label className="text-slate-400">Club ID</Label>
                <p className="text-white font-mono">{userInfo.clubid}</p>
              </div>
              <div>
                <Label className="text-slate-400">Location</Label>
                <p className="text-white">
                  {userInfo.city}, {userInfo.country}
                </p>
              </div>
              <div>
                <Label className="text-slate-400">Phone</Label>
                <p className="text-white">{userInfo.mobile_phone}</p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400 border-green-500/30"
              >
                Active Member
              </Badge>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white'
        }}
      />

      <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            Gym Member Portal
          </CardTitle>
          <CardDescription className="text-slate-300">
            Sign in to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-slate-300">
                PIN Code
              </Label>
              <Input
                id="pincode"
                type="password"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your PIN"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
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
