import { Toaster } from 'react-hot-toast'
import { ThemeSwitch } from '../components/ui/theme-switch'
import { UserMenu } from '../components/ui/user-menu'

export const CheckInsPage = () => {
  return (
    <div className="min-h-screen p-4 relative pt-20">
      <ThemeSwitch />
      <UserMenu />
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
    </div>
  )
}
