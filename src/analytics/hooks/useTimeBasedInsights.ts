import { useMemo } from 'react'
import { CheckIn } from '../../api/services/checkinService'
import { TimeBasedInsights } from '../types'
import {
  calculateMonthlyHeatmap,
  calculatePeakWorkoutHours,
  calculateRestDayPatterns,
  calculateWeeklyHeatmap,
  calculateWorkoutTimingPattern,
  processCheckinsWithTime
} from '../utils/timeBasedStats'

/**
 * Hook to calculate time-based insights from checkins data
 */
export const useTimeBasedInsights = (
  checkins: CheckIn[]
): TimeBasedInsights => {
  return useMemo(() => {
    if (!checkins || checkins.length === 0) {
      return {
        peakWorkoutHours: [],
        weeklyHeatmap: [],
        monthlyHeatmap: [],
        workoutTimingPattern: {
          morningWorkouts: 0,
          afternoonWorkouts: 0,
          eveningWorkouts: 0,
          nightWorkouts: 0,
          preferredTimeCategory: 'morning'
        },
        restDayPatterns: {
          averageRestDays: 0,
          mostCommonRestDuration: 0,
          longestRestPeriod: 0,
          restDayDistribution: []
        }
      }
    }

    // Process checkins with time-based fields
    const processedCheckins = processCheckinsWithTime(checkins)

    // Calculate all time-based metrics
    const peakWorkoutHours = calculatePeakWorkoutHours(processedCheckins)
    const weeklyHeatmap = calculateWeeklyHeatmap(processedCheckins)
    const monthlyHeatmap = calculateMonthlyHeatmap(processedCheckins)
    const workoutTimingPattern =
      calculateWorkoutTimingPattern(processedCheckins)
    const restDayPatterns = calculateRestDayPatterns(processedCheckins)

    return {
      peakWorkoutHours,
      weeklyHeatmap,
      monthlyHeatmap,
      workoutTimingPattern,
      restDayPatterns
    }
  }, [checkins])
}
