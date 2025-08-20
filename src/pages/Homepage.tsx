import { UserMenu } from '@/components/ui/user-menu'
import { ActivityCalendar, Charts } from '@/sections'
import { CheckinsProvider } from '../contexts/CheckinsContext'

export const Homepage = () => {
  return (
    <div className="min-h-screen mesh-gradient-bg p-8">
      <span className="fixed top-10 right-10 z-50 flex items-center gap-2">
        <UserMenu />
      </span>

      <CheckinsProvider>
        <div className="max-w-6xl mx-auto space-y-12">
          <ActivityCalendar />
          <Charts />
        </div>
      </CheckinsProvider>
    </div>
  )
}
