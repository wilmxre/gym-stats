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
