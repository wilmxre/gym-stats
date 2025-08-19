import { Toaster } from 'react-hot-toast'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { ThemeSwitch } from '../components/ui/theme-switch'
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
      <span className="fixed top-8 right-8 z-50 flex items-center gap-2">
        <ThemeSwitch />
      </span>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background-800))',
            color: 'hsl(var(--text-50))',
            border: '1px solid hsl(var(--secondary-600))'
          }
        }}
      />

      <Card className="w-full max-w-md bg-background-900/95 backdrop-blur-sm border border-secondary-700 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-text-50">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-200 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-background-800/30 border-secondary-600/50 focus:border-primary-500 focus:ring-primary-500/20 placeholder:text-text-300"
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-text-200 font-medium">
                PIN Code
              </Label>
              <Input
                id="pincode"
                type="password"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your PIN"
                className="bg-background-800/30 border-secondary-600/50 focus:border-primary-500 focus:ring-primary-500/20 placeholder:text-text-300"
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
                className="border-secondary-600/50 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium text-text-200 cursor-pointer"
              >
                Remember my credentials
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-text-50 font-semibold py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
