import { CheckIn } from '../../api/services/checkinService'
import {
  DayOfWeekStats,
  MonthlyStats,
  ProcessedCheckin,
  StreakData,
  WeeklyStats
} from '../types'

/**
 * Processes raw checkin data and adds computed fields
 */
export const processCheckins = (checkins: CheckIn[]): ProcessedCheckin[] => {
  return checkins
    .map((checkin) => {
      const date = new Date(checkin.date_checkin)
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
      const weekNumber = getWeekNumber(date)
      const monthYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })

      return {
        ...checkin,
        date,
        dayOfWeek,
        weekNumber,
        monthYear
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
 * Calculates total visits and unique active days
 */
export const calculateVisitsAndActiveDays = (
  checkins: ProcessedCheckin[]
): { totalVisits: number; totalActiveDays: number } => {
  const totalVisits = checkins.length
  const uniqueDates = new Set(
    checkins.map((checkin) => checkin.date.toDateString())
  )
  const totalActiveDays = uniqueDates.size

  return { totalVisits, totalActiveDays }
}

/**
 * Calculates current and longest streaks of consecutive workout days
 */
export const calculateStreaks = (checkins: ProcessedCheckin[]): StreakData => {
  if (checkins.length === 0) {
    return { current: 0, longest: 0, activeDays: new Set() }
  }

  // Get unique workout dates
  const activeDays = new Set(
    checkins.map((checkin) => checkin.date.toDateString())
  )

  const sortedDates = Array.from(activeDays)
    .map((dateStr) => new Date(dateStr))
    .sort((a, b) => a.getTime() - b.getTime())

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1])
    const currentDate = new Date(sortedDates[i])

    const dayDiff = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (dayDiff === 1) {
      tempStreak++
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  // Calculate current streak
  const latestDate = sortedDates[sortedDates.length - 1]
  if (latestDate) {
    latestDate.setHours(0, 0, 0, 0)

    // Check if latest workout was today or yesterday
    if (
      latestDate.getTime() === today.getTime() ||
      latestDate.getTime() === yesterday.getTime()
    ) {
      currentStreak = 1

      // Count backwards for consecutive days
      for (let i = sortedDates.length - 2; i >= 0; i--) {
        const currentDate = new Date(sortedDates[i])
        currentDate.setHours(0, 0, 0, 0)
        const nextDate = new Date(sortedDates[i + 1])
        nextDate.setHours(0, 0, 0, 0)

        const dayDiff = Math.floor(
          (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (dayDiff === 1) {
          currentStreak++
        } else {
          break
        }
      }
    }
  }

  return { current: currentStreak, longest: longestStreak, activeDays }
}

/**
 * Calculates day of week statistics
 */
export const calculateDayOfWeekStats = (
  checkins: ProcessedCheckin[]
): DayOfWeekStats => {
  const stats: DayOfWeekStats = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  }

  checkins.forEach((checkin) => {
    stats[checkin.dayOfWeek] = (stats[checkin.dayOfWeek] || 0) + 1
  })

  return stats
}

/**
 * Finds most and least active days of the week
 */
export const findMostAndLeastActiveDays = (
  dayStats: DayOfWeekStats
): {
  most: { day: string; count: number }
  least: { day: string; count: number }
} => {
  const entries = Object.entries(dayStats)
  const mostActive = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  )
  const leastActive = entries.reduce((min, current) =>
    current[1] < min[1] ? current : min
  )

  return {
    most: { day: mostActive[0], count: mostActive[1] },
    least: { day: leastActive[0], count: leastActive[1] }
  }
}

/**
 * Calculates weekly statistics
 */
export const calculateWeeklyStats = (
  checkins: ProcessedCheckin[]
): WeeklyStats[] => {
  const weeklyData = new Map<
    string,
    { visits: number; year: number; week: number }
  >()

  checkins.forEach((checkin) => {
    const year = checkin.date.getFullYear()
    const week = checkin.weekNumber
    const key = `${year}-W${week.toString().padStart(2, '0')}`

    if (!weeklyData.has(key)) {
      weeklyData.set(key, { visits: 0, year, week })
    }
    weeklyData.get(key)!.visits++
  })

  return Array.from(weeklyData.entries())
    .map(([key, data]) => {
      const [year, weekStr] = key.split('-W')
      const weekNum = parseInt(weekStr)

      // Calculate week start and end dates
      const jan1 = new Date(parseInt(year), 0, 1)
      const weekStart = new Date(jan1)
      weekStart.setDate(jan1.getDate() + (weekNum - 1) * 7 - jan1.getDay() + 1)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)

      return {
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        visits: data.visits,
        year: data.year,
        week: data.week
      }
    })
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.week - b.week
    })
}

/**
 * Calculates monthly statistics
 */
export const calculateMonthlyStats = (
  checkins: ProcessedCheckin[]
): MonthlyStats[] => {
  const monthlyData = new Map<string, { visits: number; year: number }>()

  checkins.forEach((checkin) => {
    const year = checkin.date.getFullYear()
    const month = checkin.date.toLocaleDateString('en-US', { month: 'long' })
    const key = `${year}-${month}`

    if (!monthlyData.has(key)) {
      monthlyData.set(key, { visits: 0, year })
    }
    monthlyData.get(key)!.visits++
  })

  return Array.from(monthlyData.entries())
    .map(([key, data]) => {
      const [yearStr, month] = key.split('-')
      return {
        month,
        visits: data.visits,
        year: parseInt(yearStr)
      }
    })
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      const monthOrder = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    })
}

/**
 * Calculates average visits per week and month
 */
export const calculateAverageVisits = (
  weeklyStats: WeeklyStats[],
  monthlyStats: MonthlyStats[]
): { perWeek: number; perMonth: number } => {
  const totalWeeklyVisits = weeklyStats.reduce(
    (sum, week) => sum + week.visits,
    0
  )
  const totalMonthlyVisits = monthlyStats.reduce(
    (sum, month) => sum + month.visits,
    0
  )

  const averageVisitsPerWeek =
    weeklyStats.length > 0 ? totalWeeklyVisits / weeklyStats.length : 0
  const averageVisitsPerMonth =
    monthlyStats.length > 0 ? totalMonthlyVisits / monthlyStats.length : 0

  return {
    perWeek: Number(averageVisitsPerWeek.toFixed(1)),
    perMonth: Number(averageVisitsPerMonth.toFixed(1))
  }
}

/**
 * Calculates workout frequency trend from weekly statistics
 */
export const calculateWorkoutFrequencyTrend = (weeklyStats: WeeklyStats[]) => {
  if (weeklyStats.length < 3) {
    return []
  }

  const recentWeeks = weeklyStats.slice(-6) // Last 6 weeks
  const trends = []

  for (let i = 1; i < recentWeeks.length; i++) {
    const current = recentWeeks[i]
    const previous = recentWeeks[i - 1]
    const change = current.visits - previous.visits

    let trend: 'increasing' | 'decreasing' | 'stable'
    if (change > 0) {
      trend = 'increasing'
    } else if (change < 0) {
      trend = 'decreasing'
    } else {
      trend = 'stable'
    }

    trends.push({
      period: `Week ${current.week}, ${current.year}`,
      visits: current.visits,
      trend
    })
  }

  return trends
}
