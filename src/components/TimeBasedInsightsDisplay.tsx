import { useTimeBasedInsights } from '../analytics'
import { CheckIn } from '../api/services/checkinService'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface TimeBasedDisplayProps {
  checkins: CheckIn[]
}

export const TimeBasedInsightsDisplay = ({
  checkins
}: TimeBasedDisplayProps) => {
  const insights = useTimeBasedInsights(checkins)

  const formatHour = (hour: number) => {
    if (hour === 0) return '12:00 AM'
    if (hour < 12) return `${hour}:00 AM`
    if (hour === 12) return '12:00 PM'
    return `${hour - 12}:00 PM`
  }

  const getTimeCategoryColor = (category: string) => {
    switch (category) {
      case 'morning':
        return 'bg-yellow-500'
      case 'afternoon':
        return 'bg-orange-500'
      case 'evening':
        return 'bg-purple-500'
      case 'night':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTimeCategoryIcon = (category: string) => {
    switch (category) {
      case 'morning':
        return '🌅'
      case 'afternoon':
        return '☀️'
      case 'evening':
        return '🌆'
      case 'night':
        return '🌙'
      default:
        return '⏰'
    }
  }

  if (checkins.length === 0) {
    return null
  }

  return (
    <div className="space-y-6 mb-6">
      {/* Peak Hours Section */}
      <Card className="bg-background-900 border border-secondary-700">
        <CardHeader>
          <CardTitle className="text-xl text-text-50 flex items-center gap-2">
            ⏰ Peak Workout Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {insights.peakWorkoutHours.slice(0, 8).map((hour) => (
              <div
                key={hour.hour}
                className="flex flex-col items-center p-3 bg-secondary-800 rounded-lg"
              >
                <span className="text-text-50 font-medium">
                  {formatHour(hour.hour)}
                </span>
                <span className="text-accent-400 text-sm">
                  {hour.count} visits
                </span>
                <span className="text-primary-400 text-xs">
                  {hour.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Timing Pattern */}
      <Card className="bg-background-900 border border-secondary-700">
        <CardHeader>
          <CardTitle className="text-xl text-text-50 flex items-center gap-2">
            🕐 Workout Timing Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-2xl mb-2">🌅</div>
              <div className="text-text-50 font-medium">Morning</div>
              <div className="text-accent-400 text-sm">6 AM - 12 PM</div>
              <div className="text-lg font-bold text-primary-400 mt-2">
                {insights.workoutTimingPattern.morningWorkouts}
              </div>
            </div>
            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-text-50 font-medium">Afternoon</div>
              <div className="text-accent-400 text-sm">12 PM - 6 PM</div>
              <div className="text-lg font-bold text-primary-400 mt-2">
                {insights.workoutTimingPattern.afternoonWorkouts}
              </div>
            </div>
            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-2xl mb-2">🌆</div>
              <div className="text-text-50 font-medium">Evening</div>
              <div className="text-accent-400 text-sm">6 PM - 12 AM</div>
              <div className="text-lg font-bold text-primary-400 mt-2">
                {insights.workoutTimingPattern.eveningWorkouts}
              </div>
            </div>
            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-2xl mb-2">🌙</div>
              <div className="text-text-50 font-medium">Night</div>
              <div className="text-accent-400 text-sm">12 AM - 6 AM</div>
              <div className="text-lg font-bold text-primary-400 mt-2">
                {insights.workoutTimingPattern.nightWorkouts}
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-accent-900/20 rounded-lg border border-accent-700">
            <div className="flex items-center justify-center gap-2">
              <span className="text-text-50">You're a</span>
              <Badge
                className={`${getTimeCategoryColor(
                  insights.workoutTimingPattern.preferredTimeCategory
                )} text-white`}
              >
                {getTimeCategoryIcon(
                  insights.workoutTimingPattern.preferredTimeCategory
                )}
                {insights.workoutTimingPattern.preferredTimeCategory}
              </Badge>
              <span className="text-text-50">person!</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rest Day Patterns */}
      <Card className="bg-background-900 border border-secondary-700">
        <CardHeader>
          <CardTitle className="text-xl text-text-50 flex items-center gap-2">
            😴 Rest Day Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-text-50 font-medium mb-1">Average Rest</div>
              <div className="text-2xl font-bold text-primary-400">
                {insights.restDayPatterns.averageRestDays}
              </div>
              <div className="text-accent-400 text-sm">
                days between workouts
              </div>
            </div>

            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-text-50 font-medium mb-1">Most Common</div>
              <div className="text-2xl font-bold text-accent-400">
                {insights.restDayPatterns.mostCommonRestDuration}
              </div>
              <div className="text-accent-400 text-sm">day rest periods</div>
            </div>

            <div className="text-center p-4 bg-secondary-800 rounded-lg">
              <div className="text-text-50 font-medium mb-1">Longest Break</div>
              <div className="text-2xl font-bold text-red-400">
                {insights.restDayPatterns.longestRestPeriod}
              </div>
              <div className="text-accent-400 text-sm">days off</div>
            </div>
          </div>

          {insights.restDayPatterns.restDayDistribution.length > 0 && (
            <div className="mt-4">
              <h4 className="text-text-50 font-medium mb-3">
                Rest Day Distribution
              </h4>
              <div className="flex flex-wrap gap-2">
                {insights.restDayPatterns.restDayDistribution
                  .slice(0, 10)
                  .map((item) => (
                    <Badge
                      key={item.duration}
                      variant="outline"
                      className="bg-secondary-800 border-secondary-600 text-text-50"
                    >
                      {item.duration} day{item.duration !== 1 ? 's' : ''}:{' '}
                      {item.count}x
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
