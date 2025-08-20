import { Toaster } from 'react-hot-toast'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../hooks/useAuth'

export const LoginPage = () => {
  const {
    email,
    setEmail,
    pincode,
    setPincode,
    rememberCredentials,
    setRememberCredentials,
    isLoading,
    handleLogin
  } = useAuth()

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4 relative">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background-900))',
            color: 'hsl(var(--text-50))',
            border: '1px solid hsl(var(--accent-500))'
          }
        }}
      />

      <Card className="w-full max-w-md p-6 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-text-50">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-50 font-medium">
                Email Address
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
              <Label htmlFor="pincode" className="text-text-50 font-medium">
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberCredentials}
                onCheckedChange={(checked) =>
                  setRememberCredentials(checked === true)
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm text-text-50 cursor-pointer"
              >
                Remember my credentials
              </Label>
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
