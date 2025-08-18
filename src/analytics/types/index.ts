export interface KPIMetrics {
  totalCheckins: {
    lifetime: number
    thisMonth: number
    last30Days: number
    monthlyTrend: number[]
  }
  streaks: {
    current: number
    longest: number
    streakHistory: number[]
  }
  weeklyFrequency: {
    current: number
    trend: number
    sparklineData: number[]
  }
  lastActivity: {
    timeAgo: string
    fullDate: string
    clubName: string
    isRecent: boolean
  }
  favoriteClub: {
    name: string
    visits: number
    percentage: number
    comparison: { name: string; visits: number }[]
  }
  typicalTime: {
    timeRange: string
    peakHour: number
    distribution: number[]
  }
}

export interface CheckinTimeData {
  date: string
  hour: number
  clubName: string
}
