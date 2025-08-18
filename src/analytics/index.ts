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

// Export all analytics hooks
export { useCoreStatistics } from './hooks/useCoreStatistics'
