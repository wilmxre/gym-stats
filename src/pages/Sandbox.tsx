import { UserMenu } from '@/components/ui/user-menu'
import { ActivityCalendar, Charts } from '@/sections'

export const Sandbox = () => {
  return (
    <div className="min-h-screen mesh-gradient-bg p-8">
      <span className="fixed top-10 right-10 z-50 flex items-center gap-2">
        <UserMenu />
      </span>

      <div className="max-w-6xl mx-auto space-y-12">
        <ActivityCalendar />
        <Charts />
      </div>
    </div>
  )
}
