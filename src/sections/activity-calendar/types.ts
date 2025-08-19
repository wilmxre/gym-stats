export interface HeatmapData {
  date: string
  count: number
  hasVisit: boolean
}

export interface CalendarStats {
  total: number
  completionRate: number
  activeStreak: number
  longestStreak: number
}
