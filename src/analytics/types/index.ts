import { CheckIn } from '../../api/services/checkinService'

export interface CoreStatistics {
  totalVisits: number
  totalActiveDays: number
  currentStreak: number
  longestStreak: number
  averageVisitsPerWeek: number
  averageVisitsPerMonth: number
  mostActiveDayOfWeek: {
    day: string
    count: number
  }
  leastActiveDayOfWeek: {
    day: string
    count: number
  }
  workoutFrequencyTrend: {
    period: string
    visits: number
    trend: 'increasing' | 'decreasing' | 'stable'
  }[]
}

export interface ProcessedCheckin extends CheckIn {
  date: Date
  dayOfWeek: string
  weekNumber: number
  monthYear: string
}

export interface DayOfWeekStats {
  [key: string]: number
}

export interface WeeklyStats {
  weekStart: string
  weekEnd: string
  visits: number
  year: number
  week: number
}

export interface MonthlyStats {
  month: string
  visits: number
  year: number
}

export interface StreakData {
  current: number
  longest: number
  activeDays: Set<string>
}

export interface TimeBasedInsights {
  peakWorkoutHours: {
    hour: number
    count: number
    percentage: number
  }[]
  weeklyHeatmap: {
    week: string
    dayOfWeek: string
    visits: number
    intensity: number // 0-1 scale for heatmap visualization
  }[]
  monthlyHeatmap: {
    month: string
    day: number
    visits: number
    intensity: number // 0-1 scale for heatmap visualization
  }[]
  workoutTimingPattern: {
    morningWorkouts: number // 6 AM - 12 PM
    afternoonWorkouts: number // 12 PM - 6 PM
    eveningWorkouts: number // 6 PM - 12 AM
    nightWorkouts: number // 12 AM - 6 AM
    preferredTimeCategory: 'morning' | 'afternoon' | 'evening' | 'night'
  }
  restDayPatterns: {
    averageRestDays: number
    mostCommonRestDuration: number
    longestRestPeriod: number
    restDayDistribution: {
      duration: number // days of rest
      count: number // how many times this duration occurred
    }[]
  }
}

export interface HourlyStats {
  [hour: number]: number
}

export interface WorkoutGap {
  startDate: string
  endDate: string
  duration: number // days
}

export interface ProcessedCheckinWithTime extends ProcessedCheckin {
  hour: number
  timeCategory: 'morning' | 'afternoon' | 'evening' | 'night'
}
