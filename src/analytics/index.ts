// Export all analytics types
export * from './types'

// Export all core statistics utilities
export {
  calculateAverageVisits,
  calculateDayOfWeekStats,
  calculateMonthlyStats,
  calculateStreaks,
  calculateVisitsAndActiveDays,
  calculateWeeklyStats,
  calculateWorkoutFrequencyTrend,
  findMostAndLeastActiveDays,
  getWeekNumber,
  processCheckins
} from './utils/coreStats'

// Export all time-based statistics utilities
export {
  calculateMonthlyHeatmap,
  calculatePeakWorkoutHours,
  calculateRestDayPatterns,
  calculateWeeklyHeatmap,
  calculateWorkoutTimingPattern,
  processCheckinsWithTime
} from './utils/timeBasedStats'

// Export all analytics hooks
export { useCoreStatistics } from './hooks/useCoreStatistics'
export { useTimeBasedInsights } from './hooks/useTimeBasedInsights'
