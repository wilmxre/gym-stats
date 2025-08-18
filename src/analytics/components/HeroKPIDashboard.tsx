import {
  Activity,
  Clock,
  Flame,
  MapPin,
  TrendingUp,
  Trophy
} from 'lucide-react'
import { useKPIMetrics } from '../hooks/useKPIMetrics'
import { KPICard } from './KPICard'

export const HeroKPIDashboard = () => {
  const { metrics, hasData } = useKPIMetrics()

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
    favoriteClub
  } = metrics

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-text-50 mb-6">Quick Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-background-900/40 backdrop-blur-sm border border-secondary-800/50 p-4 rounded-xl shadow-lg">
        <KPICard
          title="Total Check-ins"
          icon={Activity}
          value={totalCheckins.lifetime.toLocaleString()}
          description="Total visits"
        />

        <KPICard
          title="Last Check-in"
          icon={Clock}
          value={lastActivity.timeAgo}
          description={`at ${lastActivity.clubName}`}
        />

        <KPICard
          title="Weekly Average"
          icon={TrendingUp}
          value={weeklyFrequency.current}
          description="Sessions per week"
        />

        <KPICard
          title="Current Streak"
          icon={Flame}
          value={`${streaks.current}`}
          description="Days in a row"
        />

        <KPICard
          title="Best Streak"
          icon={Trophy}
          value={`${streaks.longest}`}
          description="Days in a row"
        />

        <KPICard
          title="Favorite Club"
          icon={MapPin}
          value={favoriteClub.name}
          description={`${favoriteClub.visits} visits`}
        />
      </div>
    </div>
  )
}
