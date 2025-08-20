import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { UserMenu } from '../components/ui/user-menu'

export const CheckInsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4 relative pt-20">
      <UserMenu />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-text-50">Check-ins History</h1>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-secondary-600 text-text-200 hover:bg-secondary-800"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {/* TODO: Add detailed check-ins table/list here */}
        <div className="text-center py-12 text-text-400">
          <p className="text-lg">Detailed check-ins view coming soon</p>
          <p className="text-sm mt-2">
            This will show your complete check-in history with filters and
            search
          </p>
        </div>
      </div>

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
