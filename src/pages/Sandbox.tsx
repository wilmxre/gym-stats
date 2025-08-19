import { UserMenu } from '@/components/ui/user-menu'
import { ActivityCalendar } from '../sections/activity-calendar'

export const Sandbox = () => {
  return (
    <div className="min-h-screen mesh-gradient-bg p-8">
      <span className="fixed top-8 right-8 z-50 flex items-center gap-2">
        <UserMenu />
      </span>

      <div className="max-w-6xl mx-auto">
        <ActivityCalendar />
      </div>
    </div>
  )
}
