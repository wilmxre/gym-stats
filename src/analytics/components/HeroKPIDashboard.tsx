import { useKPIMetrics } from '../hooks/useKPIMetrics'
import { KPICard } from './KPICard'

export const HeroKPIDashboard = () => {
  const { metrics, isLoading, hasData } = useKPIMetrics()

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-50 mb-6">Hero KPIs</h2>{' '}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 bg-secondary-800 animate-pulse rounded-lg border border-secondary-700"
            />
          ))}
        </div>
      </div>
    )
  }

  if (!hasData) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-50 mb-6">Hero KPIs</h2>
        <div className="text-center py-12 text-text-400 bg-background-900 rounded-lg border border-secondary-700">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg font-medium mb-2">No check-in data available</p>
          <p className="text-sm">
            Start tracking your gym visits to see your performance metrics
          </p>
        </div>
      </div>
    )
  }

  const {
    totalCheckins,
    streaks,
    weeklyFrequency,
    lastActivity,
    favoriteClub,
    typicalTime
    // ...existing code...
  } = metrics

  // Determine streak badge color
  const getStreakBadgeColor = (streak: number) => {
    if (streak >= 3) return 'green'
    if (streak >= 1) return 'orange'
    return 'gray'
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-text-50 mb-6">Hero KPIs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Check-ins Card */}
        <KPICard
          title="TOTAL CHECK-INS"
          icon="💪"
          mainValue={totalCheckins.lifetime.toLocaleString()}
          mainLabel="Lifetime"
        />

        {/* Current Streak Card */}
        <KPICard
          title="CURRENT STREAK"
          icon="🔥"
          mainValue={`${streaks.current}`}
          mainLabel="Days"
          badge={
            streaks.current > 0
              ? {
                  color: getStreakBadgeColor(streaks.current),
                  text: streaks.current >= 3 ? 'Hot!' : 'Good'
                }
              : undefined
          }
        />

        {/* Weekly Average Card */}
        <KPICard
          title="WEEKLY AVERAGE"
          icon="📈"
          mainValue={weeklyFrequency.current}
          mainLabel="Sessions per week"
        />

        {/* Last Check-in Card */}
        <KPICard
          title="LAST CHECK-IN"
          icon="⏰"
          mainValue={lastActivity.timeAgo}
          mainLabel={lastActivity.clubName}
          pulse={lastActivity.isRecent}
        />

        {/* Favorite Club Card */}
        <KPICard
          title="FAVORITE CLUB"
          icon="🏢"
          mainValue={favoriteClub.name}
          mainLabel={`${favoriteClub.visits} visits`}
        />

        {/* Best Streak Card */}
        <KPICard
          title="BEST STREAK"
          icon="🏆"
          mainValue={`${streaks.longest}`}
          mainLabel="Days"
          badge={{
            color: 'gold',
            text: 'Record'
          }}
        />
      </div>
    </div>
  )
}
