import { Toaster } from 'react-hot-toast'
import { CoreStatisticsDisplay } from '../components/CoreStatisticsDisplay'
import { TimeBasedInsightsDisplay } from '../components/TimeBasedInsightsDisplay'
import { ThemeSwitch } from '../components/ui/theme-switch'
import { UserMenu } from '../components/ui/user-menu'
import { useAllCheckins } from '../hooks/useAllCheckins'
import { useCheckins } from '../hooks/useCheckins'

export const CheckInsPage = () => {
  const {
    checkins,
    isLoading,
    currentPage,
    totalCheckins,
    totalPages,
    refreshCheckins,
    goToPage
  } = useCheckins()

  const { allCheckins, isLoading: isLoadingAllCheckins } = useAllCheckins()

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen mesh-gradient-bg p-4 relative pt-20">
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

      <div className="max-w-screen-xl mx-auto">
        {/* Analytics Section */}
        {!isLoadingAllCheckins && allCheckins.length > 0 && (
          <>
            <CoreStatisticsDisplay checkins={allCheckins} />
            <TimeBasedInsightsDisplay checkins={allCheckins} />
          </>
        )}
      </div>
    </div>
  )
}
