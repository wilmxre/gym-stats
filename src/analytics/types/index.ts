export interface KPIMetrics {
  totalCheckins: {
    lifetime: number
  }
  streaks: {
    current: number
    longest: number
  }
  weeklyFrequency: {
    current: number
  }
  lastActivity: {
    timeAgo: string
    clubName: string
  }
  favoriteClub: {
    name: string
    visits: number
  }
}

export interface CheckinTimeData {
  date: string
  hour: number
  clubName: string
}
