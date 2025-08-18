import { CheckIn } from '../../api/services/checkinService'
import { KPIMetrics } from '../types'

/**
 * Calculate comprehensive KPI metrics from check-in data
 */
export const calculateKPIMetrics = (checkins: CheckIn[]): KPIMetrics => {
  if (checkins.length === 0) {
    return getEmptyMetrics()
  }

  return {
    totalCheckins: calculateTotalCheckins(checkins),
    streaks: calculateStreaks(checkins),
    weeklyFrequency: calculateWeeklyFrequency(checkins),
    lastActivity: calculateLastActivity(checkins),
    favoriteClub: calculateFavoriteClub(checkins),
    typicalTime: calculateTypicalTime(checkins)
  }
}

/**
 * Calculate total check-ins for different time periods
 */
const calculateTotalCheckins = (checkins: CheckIn[]) => {
  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const thisMonth = checkins.filter(
    (checkin) => new Date(checkin.date_checkin) >= currentMonthStart
  ).length

  const last30Days = checkins.filter(
    (checkin) => new Date(checkin.date_checkin) >= thirtyDaysAgo
  ).length

  // Calculate monthly trend for the last 6 months
  const monthlyTrend = calculateMonthlyTrend(checkins, 6)

  return {
    lifetime: checkins.length,
    thisMonth,
    last30Days,
    monthlyTrend
  }
}

/**
 * Calculate current and longest streaks
 */
const calculateStreaks = (checkins: CheckIn[]) => {
  const checkinDates = getUniqueCheckinDates(checkins)

  const currentStreak = calculateCurrentStreak(checkinDates)
  const longestStreak = calculateLongestStreak(checkinDates)
  const streakHistory = calculateStreakHistory(checkinDates, 30) // Last 30 days

  return {
    current: currentStreak,
    longest: longestStreak,
    streakHistory
  }
}

/**
 * Calculate weekly frequency and trend
 */
const calculateWeeklyFrequency = (checkins: CheckIn[]) => {
  const now = new Date()
  const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000)
  const eightWeeksAgo = new Date(now.getTime() - 56 * 24 * 60 * 60 * 1000)

  const last4Weeks = checkins.filter(
    (checkin) => new Date(checkin.date_checkin) >= fourWeeksAgo
  ).length

  const weeks4to8 = checkins.filter((checkin) => {
    const date = new Date(checkin.date_checkin)
    return date >= eightWeeksAgo && date < fourWeeksAgo
  }).length

  const current = Number((last4Weeks / 4).toFixed(1))
  const previous = Number((weeks4to8 / 4).toFixed(1))
  const trend = Number((current - previous).toFixed(1))

  // Generate sparkline data for the last 8 weeks
  const sparklineData = generateWeeklySparkline(checkins, 8)

  return {
    current,
    trend,
    sparklineData
  }
}

/**
 * Calculate last activity information
 */
const calculateLastActivity = (checkins: CheckIn[]) => {
  if (checkins.length === 0) {
    return {
      timeAgo: 'Never',
      fullDate: '',
      clubName: '',
      isRecent: false
    }
  }

  const lastCheckin = checkins[0] // Already sorted by date (newest first)
  const lastDate = new Date(lastCheckin.date_checkin)
  const now = new Date()

  const timeAgo = formatTimeAgo(lastDate, now)
  const fullDate = formatFullDate(lastDate)
  const isRecent = now.getTime() - lastDate.getTime() < 6 * 60 * 60 * 1000 // 6 hours

  return {
    timeAgo,
    fullDate,
    clubName: lastCheckin.club_name,
    isRecent
  }
}

/**
 * Calculate favorite club statistics
 */
const calculateFavoriteClub = (checkins: CheckIn[]) => {
  const clubCounts = checkins.reduce(
    (acc, checkin) => {
      acc[checkin.club_name] = (acc[checkin.club_name] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const sortedClubs = Object.entries(clubCounts).sort(([, a], [, b]) => b - a)

  if (sortedClubs.length === 0) {
    return {
      name: 'No data',
      visits: 0,
      percentage: 0,
      comparison: []
    }
  }

  const [favoriteName, favoriteVisits] = sortedClubs[0]
  const percentage = Math.round((favoriteVisits / checkins.length) * 100)
  const comparison = sortedClubs
    .slice(1, 3)
    .map(([name, visits]) => ({ name, visits }))

  return {
    name: favoriteName,
    visits: favoriteVisits,
    percentage,
    comparison
  }
}

/**
 * Calculate typical check-in time
 */
const calculateTypicalTime = (checkins: CheckIn[]) => {
  const hours = checkins.map((checkin) => {
    const date = new Date(checkin.date_checkin)
    return date.getHours()
  })

  if (hours.length === 0) {
    return {
      timeRange: 'No data',
      peakHour: 0,
      distribution: []
    }
  }

  // Calculate median hour
  const sortedHours = hours.sort((a, b) => a - b)
  const medianHour = sortedHours[Math.floor(sortedHours.length / 2)]

  // Create 2-hour window around median
  const startHour = Math.max(0, medianHour - 1)
  const endHour = Math.min(23, medianHour + 1)

  const timeRange = `${formatHour(startHour)}–${formatHour(endHour)}`

  // Generate hourly distribution for sparkline
  const distribution = generateHourlyDistribution(hours)

  return {
    timeRange,
    peakHour: medianHour,
    distribution
  }
}

/**
 * Helper functions
 */

const getEmptyMetrics = (): KPIMetrics => ({
  totalCheckins: { lifetime: 0, thisMonth: 0, last30Days: 0, monthlyTrend: [] },
  streaks: { current: 0, longest: 0, streakHistory: [] },
  weeklyFrequency: { current: 0, trend: 0, sparklineData: [] },
  lastActivity: {
    timeAgo: 'Never',
    fullDate: '',
    clubName: '',
    isRecent: false
  },
  favoriteClub: { name: 'No data', visits: 0, percentage: 0, comparison: [] },
  typicalTime: { timeRange: 'No data', peakHour: 0, distribution: [] }
})

const getUniqueCheckinDates = (checkins: CheckIn[]): string[] => {
  const dates = new Set(
    checkins.map(
      (checkin) => new Date(checkin.date_checkin).toISOString().split('T')[0]
    )
  )
  return Array.from(dates).sort().reverse()
}

const calculateCurrentStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  // If no check-in today or yesterday, streak is 0
  if (dates[0] !== today && dates[0] !== yesterday) {
    return 0
  }

  let streak = 0
  const currentDate = new Date()

  for (const dateStr of dates) {
    const checkDate = currentDate.toISOString().split('T')[0]

    if (dateStr === checkDate) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

const calculateLongestStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0

  let maxStreak = 1
  let currentStreak = 1

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i])
    const previousDate = new Date(dates[i - 1])
    const dayDiff =
      (previousDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000)

    if (dayDiff === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return maxStreak
}

const calculateStreakHistory = (dates: string[], days: number): number[] => {
  const history: number[] = []
  const endDate = new Date()

  for (let i = 0; i < days; i++) {
    const checkDate = new Date(endDate.getTime() - i * 24 * 60 * 60 * 1000)
    const dateStr = checkDate.toISOString().split('T')[0]
    const hasCheckin = dates.includes(dateStr) ? 1 : 0
    history.unshift(hasCheckin)
  }

  return history
}

const calculateMonthlyTrend = (
  checkins: CheckIn[],
  months: number
): number[] => {
  const trend: number[] = []
  const now = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)

    const monthCheckins = checkins.filter((checkin) => {
      const date = new Date(checkin.date_checkin)
      return date >= monthStart && date <= monthEnd
    }).length

    trend.push(monthCheckins)
  }

  return trend
}

const generateWeeklySparkline = (
  checkins: CheckIn[],
  weeks: number
): number[] => {
  const data: number[] = []
  const now = new Date()

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(
      now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000
    )
    const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)

    const weekCheckins = checkins.filter((checkin) => {
      const date = new Date(checkin.date_checkin)
      return date >= weekStart && date < weekEnd
    }).length

    data.push(weekCheckins)
  }

  return data
}

const generateHourlyDistribution = (hours: number[]): number[] => {
  const distribution = new Array(24).fill(0)

  hours.forEach((hour) => {
    distribution[hour]++
  })

  return distribution
}

const formatTimeAgo = (date: Date, now: Date): string => {
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  }
}

const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`
}
