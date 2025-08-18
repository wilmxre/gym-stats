import { useMemo } from 'react'
import { CheckIn } from '../../api/services/checkinService'
import { CoreStatistics } from '../types'
import {
  calculateAverageVisits,
  calculateDayOfWeekStats,
  calculateMonthlyStats,
  calculateStreaks,
  calculateVisitsAndActiveDays,
  calculateWeeklyStats,
  calculateWorkoutFrequencyTrend,
  findMostAndLeastActiveDays,
  processCheckins
} from '../utils/coreStats'

/**
 * Hook to calculate core statistics from checkins data
 */
export const useCoreStatistics = (checkins: CheckIn[]): CoreStatistics => {
  return useMemo(() => {
    if (!checkins || checkins.length === 0) {
      return {
        totalVisits: 0,
        totalActiveDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        averageVisitsPerWeek: 0,
        averageVisitsPerMonth: 0,
        mostActiveDayOfWeek: { day: 'Monday', count: 0 },
        leastActiveDayOfWeek: { day: 'Monday', count: 0 },
        workoutFrequencyTrend: []
      }
    }

    // Process raw checkin data
    const processedCheckins = processCheckins(checkins)

    // Calculate basic stats
    const { totalVisits, totalActiveDays } =
      calculateVisitsAndActiveDays(processedCheckins)

    // Calculate streaks
    const streaks = calculateStreaks(processedCheckins)

    // Calculate day-of-week statistics
    const dayOfWeekStats = calculateDayOfWeekStats(processedCheckins)
    const { most, least } = findMostAndLeastActiveDays(dayOfWeekStats)

    // Calculate weekly and monthly statistics
    const weeklyStats = calculateWeeklyStats(processedCheckins)
    const monthlyStats = calculateMonthlyStats(processedCheckins)

    // Calculate averages
    const averages = calculateAverageVisits(weeklyStats, monthlyStats)

    // Calculate workout frequency trend
    const workoutFrequencyTrend = calculateWorkoutFrequencyTrend(weeklyStats)

    return {
      totalVisits,
      totalActiveDays,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
      averageVisitsPerWeek: averages.perWeek,
      averageVisitsPerMonth: averages.perMonth,
      mostActiveDayOfWeek: most,
      leastActiveDayOfWeek: least,
      workoutFrequencyTrend
    }
  }, [checkins])
}
