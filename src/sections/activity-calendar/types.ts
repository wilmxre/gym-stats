export interface HeatmapData {
  date: string
  count: number
  hasVisit: boolean
  streakPosition?: number
  streakLength?: number
}

export interface CalendarStats {
  total: number
  completionRate: number
  currentStreak: number
  bestStreak: number
}
