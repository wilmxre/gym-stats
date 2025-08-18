import { useCoreStatistics } from '../analytics'
import { CheckIn } from '../api/services/checkinService'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

interface CoreStatisticsDisplayProps {
  checkins: CheckIn[]
}

export const CoreStatisticsDisplay = ({
  checkins
}: CoreStatisticsDisplayProps) => {
  const stats = useCoreStatistics(checkins)

  const StatCard = ({
    title,
    value,
    subtitle
  }: {
    title: string
    value: string | number
    subtitle?: string
  }) => (
    <div className="p-4 bg-secondary-800 rounded-lg border border-secondary-600">
      <h3 className="text-text-400 text-sm font-medium">{title}</h3>
      <p className="text-text-50 text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-text-400 text-xs mt-1">{subtitle}</p>}
    </div>
  )

  return (
    <Card className="bg-background-900 border border-secondary-700 mb-6">
      <CardHeader>
        <CardTitle className="text-xl text-text-50">
          Workout Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Visits" value={stats.totalVisits} />
          <StatCard title="Active Days" value={stats.totalActiveDays} />
          <StatCard
            title="Current Streak"
            value={stats.currentStreak}
            subtitle="consecutive days"
          />
          <StatCard
            title="Longest Streak"
            value={stats.longestStreak}
            subtitle="consecutive days"
          />
          <StatCard
            title="Avg Visits/Week"
            value={stats.averageVisitsPerWeek}
          />
          <StatCard
            title="Avg Visits/Month"
            value={stats.averageVisitsPerMonth}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-secondary-800 rounded-lg border border-secondary-600">
            <h3 className="text-text-400 text-sm font-medium mb-2">
              Most Active Day
            </h3>
            <div className="flex items-center justify-between">
              <Badge className="bg-green-600 text-text-50">
                {stats.mostActiveDayOfWeek.day}
              </Badge>
              <span className="text-text-50 text-lg font-semibold">
                {stats.mostActiveDayOfWeek.count} visits
              </span>
            </div>
          </div>

          <div className="p-4 bg-secondary-800 rounded-lg border border-secondary-600">
            <h3 className="text-text-400 text-sm font-medium mb-2">
              Least Active Day
            </h3>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {stats.leastActiveDayOfWeek.day}
              </Badge>
              <span className="text-text-50 text-lg font-semibold">
                {stats.leastActiveDayOfWeek.count} visits
              </span>
            </div>
          </div>
        </div>

        {stats.workoutFrequencyTrend.length > 0 && (
          <div className="p-4 bg-secondary-800 rounded-lg border border-secondary-600">
            <h3 className="text-text-400 text-sm font-medium mb-3">
              Recent Workout Trend
            </h3>
            <div className="space-y-2">
              {stats.workoutFrequencyTrend.slice(-3).map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-text-50 text-sm">{trend.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-50 font-medium">
                      {trend.visits} visits
                    </span>
                    <Badge
                      className={`text-xs ${
                        trend.trend === 'increasing'
                          ? 'bg-green-600'
                          : trend.trend === 'decreasing'
                            ? 'bg-red-600'
                            : 'bg-gray-600'
                      }`}
                    >
                      {trend.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
