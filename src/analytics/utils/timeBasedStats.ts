import { CheckIn } from '../../api/services/checkinService'
import { HourlyStats, ProcessedCheckinWithTime, WorkoutGap } from '../types'

/**
 * Processes checkins and adds time-based fields
 */
export const processCheckinsWithTime = (
  checkins: CheckIn[]
): ProcessedCheckinWithTime[] => {
  return checkins
    .map((checkin) => {
      const date = new Date(checkin.date_checkin)
      const hour = date.getHours()
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
      const weekNumber = getWeekNumber(date)
      const monthYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })

      let timeCategory: 'morning' | 'afternoon' | 'evening' | 'night'
      if (hour >= 6 && hour < 12) {
        timeCategory = 'morning'
      } else if (hour >= 12 && hour < 18) {
        timeCategory = 'afternoon'
      } else if (hour >= 18 && hour < 24) {
        timeCategory = 'evening'
      } else {
        timeCategory = 'night'
      }

      return {
        ...checkin,
        date,
        dayOfWeek,
        weekNumber,
        monthYear,
        hour,
        timeCategory
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

/**
 * Gets the ISO week number for a given date
 */
export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf())
  const dayNumber = (date.getUTCDay() + 6) % 7
  target.setUTCDate(target.getUTCDate() - dayNumber + 3)
  const firstThursday = target.valueOf()
  target.setUTCMonth(0, 1)
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7))
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000)
}

/**
 * Calculates peak workout hours
 */
export const calculatePeakWorkoutHours = (
  checkins: ProcessedCheckinWithTime[]
): {
  hour: number
  count: number
  percentage: number
}[] => {
  if (checkins.length === 0) return []

  const hourlyStats: HourlyStats = {}

  // Initialize all hours
  for (let hour = 0; hour < 24; hour++) {
    hourlyStats[hour] = 0
  }

  // Count visits by hour
  checkins.forEach((checkin) => {
    hourlyStats[checkin.hour]++
  })

  // Convert to array with percentages
  const totalVisits = checkins.length
  return Object.entries(hourlyStats)
    .map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
      percentage: Number(((count / totalVisits) * 100).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Calculates weekly activity heatmap data
 */
export const calculateWeeklyHeatmap = (
  checkins: ProcessedCheckinWithTime[]
): {
  week: string
  dayOfWeek: string
  visits: number
  intensity: number
}[] => {
  if (checkins.length === 0) return []

  const weeklyData = new Map<string, number>()

  checkins.forEach((checkin) => {
    const year = checkin.date.getFullYear()
    const week = checkin.weekNumber
    const day = checkin.dayOfWeek
    const key = `${year}-W${week.toString().padStart(2, '0')}-${day}`

    weeklyData.set(key, (weeklyData.get(key) || 0) + 1)
  })

  // Find max visits for normalization
  const maxVisits = Math.max(...Array.from(weeklyData.values()))

  return Array.from(weeklyData.entries())
    .map(([key, visits]) => {
      const [yearWeek, dayOfWeek] = key.split('-', 3)
      const week = `${yearWeek.split('-')[0]} ${yearWeek.split('-')[1]}`

      return {
        week,
        dayOfWeek: dayOfWeek.split('-')[2],
        visits,
        intensity: maxVisits > 0 ? visits / maxVisits : 0
      }
    })
    .sort((a, b) => a.week.localeCompare(b.week))
}

/**
 * Calculates monthly activity heatmap data
 */
export const calculateMonthlyHeatmap = (
  checkins: ProcessedCheckinWithTime[]
): {
  month: string
  day: number
  visits: number
  intensity: number
}[] => {
  if (checkins.length === 0) return []

  const monthlyData = new Map<string, number>()

  checkins.forEach((checkin) => {
    const year = checkin.date.getFullYear()
    const month = checkin.date.toLocaleDateString('en-US', { month: 'long' })
    const day = checkin.date.getDate()
    const key = `${year}-${month}-${day}`

    monthlyData.set(key, (monthlyData.get(key) || 0) + 1)
  })

  // Find max visits for normalization
  const maxVisits = Math.max(...Array.from(monthlyData.values()))

  return Array.from(monthlyData.entries())
    .map(([key, visits]) => {
      const [year, month, dayStr] = key.split('-')
      const day = parseInt(dayStr)

      return {
        month: `${month} ${year}`,
        day,
        visits,
        intensity: maxVisits > 0 ? visits / maxVisits : 0
      }
    })
    .sort((a, b) => {
      if (a.month !== b.month) return a.month.localeCompare(b.month)
      return a.day - b.day
    })
}

/**
 * Analyzes workout timing patterns
 */
export const calculateWorkoutTimingPattern = (
  checkins: ProcessedCheckinWithTime[]
) => {
  if (checkins.length === 0) {
    return {
      morningWorkouts: 0,
      afternoonWorkouts: 0,
      eveningWorkouts: 0,
      nightWorkouts: 0,
      preferredTimeCategory: 'morning' as const
    }
  }

  const timeCounts = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0
  }

  checkins.forEach((checkin) => {
    timeCounts[checkin.timeCategory]++
  })

  // Find preferred time category
  const preferredTimeCategory = Object.entries(timeCounts).reduce(
    (max, current) => (current[1] > max[1] ? current : max)
  )[0] as 'morning' | 'afternoon' | 'evening' | 'night'

  return {
    morningWorkouts: timeCounts.morning,
    afternoonWorkouts: timeCounts.afternoon,
    eveningWorkouts: timeCounts.evening,
    nightWorkouts: timeCounts.night,
    preferredTimeCategory
  }
}

/**
 * Calculates rest day patterns and gaps between workouts
 */
export const calculateRestDayPatterns = (
  checkins: ProcessedCheckinWithTime[]
) => {
  if (checkins.length <= 1) {
    return {
      averageRestDays: 0,
      mostCommonRestDuration: 0,
      longestRestPeriod: 0,
      restDayDistribution: []
    }
  }

  // Get unique workout dates
  const uniqueDates = Array.from(
    new Set(checkins.map((checkin) => checkin.date.toDateString()))
  )
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime())

  const gaps: WorkoutGap[] = []

  // Calculate gaps between consecutive workout days
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = uniqueDates[i - 1]
    const currentDate = uniqueDates[i]

    const gapDays =
      Math.floor(
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      ) - 1 // Subtract 1 because we want rest days, not total days

    if (gapDays > 0) {
      gaps.push({
        startDate: prevDate.toISOString().split('T')[0],
        endDate: currentDate.toISOString().split('T')[0],
        duration: gapDays
      })
    }
  }

  if (gaps.length === 0) {
    return {
      averageRestDays: 0,
      mostCommonRestDuration: 0,
      longestRestPeriod: 0,
      restDayDistribution: []
    }
  }

  // Calculate statistics
  const totalRestDays = gaps.reduce((sum, gap) => sum + gap.duration, 0)
  const averageRestDays = Number((totalRestDays / gaps.length).toFixed(1))
  const longestRestPeriod = Math.max(...gaps.map((gap) => gap.duration))

  // Calculate distribution
  const durationCounts = new Map<number, number>()
  gaps.forEach((gap) => {
    durationCounts.set(
      gap.duration,
      (durationCounts.get(gap.duration) || 0) + 1
    )
  })

  const restDayDistribution = Array.from(durationCounts.entries())
    .map(([duration, count]) => ({ duration, count }))
    .sort((a, b) => a.duration - b.duration)

  // Find most common rest duration
  const mostCommonRestDuration = restDayDistribution.reduce((max, current) =>
    current.count > max.count ? current : max
  ).duration

  return {
    averageRestDays,
    mostCommonRestDuration,
    longestRestPeriod,
    restDayDistribution
  }
}
