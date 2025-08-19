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

  if (!hasData || !metrics) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-50 mb-6">Quick Stats</h2>
        <p className="text-md font-medium mb-2">No check-in data available</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
