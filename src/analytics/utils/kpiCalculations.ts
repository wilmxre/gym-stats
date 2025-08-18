import { CheckIn } from '../../api/services/checkinService'
import { KPIMetrics } from '../types'

export const calculateKPIMetrics = (checkins: CheckIn[]): KPIMetrics => {
  if (checkins.length === 0) {
    return getEmptyMetrics()
  }

  return {
    totalCheckins: calculateTotalCheckins(checkins),
    streaks: calculateStreaks(checkins),
    weeklyFrequency: calculateWeeklyFrequency(checkins),
    lastActivity: calculateLastActivity(checkins),
    favoriteClub: calculateFavoriteClub(checkins)
  }
}

const calculateTotalCheckins = (checkins: CheckIn[]) => {
  return {
    lifetime: checkins.length
  }
}

const calculateStreaks = (checkins: CheckIn[]) => {
  const checkinDates = getUniqueCheckinDates(checkins)

  const currentStreak = calculateCurrentStreak(checkinDates)
  const longestStreak = calculateLongestStreak(checkinDates)

  return {
    current: currentStreak,
    longest: longestStreak
  }
}

const calculateWeeklyFrequency = (checkins: CheckIn[]) => {
  const now = new Date()
  const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000)

  const last4Weeks = checkins.filter(
    (checkin) => new Date(checkin.date_checkin) >= fourWeeksAgo
  ).length

  const current = Number((last4Weeks / 4).toFixed(1))

  return {
    current
  }
}

const calculateLastActivity = (checkins: CheckIn[]) => {
  if (checkins.length === 0) {
    return {
      timeAgo: 'Never',
      clubName: ''
    }
  }

  const lastCheckin = checkins[0]
  const lastDate = new Date(lastCheckin.date_checkin)
  const now = new Date()

  const timeAgo = formatTimeAgo(lastDate, now)

  return {
    timeAgo,
    clubName: lastCheckin.club_name
  }
}

const calculateFavoriteClub = (checkins: CheckIn[]) => {
  const clubCounts = checkins.reduce(
    (acc, checkin) => {
      acc[checkin.club_name] = (acc[checkin.club_name] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const sortedClubs = Object.entries(clubCounts).sort(([, a], [, b]) => b - a)

  if (sortedClubs.length === 0) {
    return {
      name: 'No data',
      visits: 0
    }
  }

  const [favoriteName, favoriteVisits] = sortedClubs[0]

  return {
    name: favoriteName,
    visits: favoriteVisits
  }
}

const getEmptyMetrics = (): KPIMetrics => ({
  totalCheckins: { lifetime: 0 },
  streaks: { current: 0, longest: 0 },
  weeklyFrequency: { current: 0 },
  lastActivity: {
    timeAgo: 'Never',
    clubName: ''
  },
  favoriteClub: { name: 'No data', visits: 0 }
})

const getUniqueCheckinDates = (checkins: CheckIn[]): string[] => {
  const dates = new Set(
    checkins.map(
      (checkin) => new Date(checkin.date_checkin).toISOString().split('T')[0]
    )
  )
  return Array.from(dates).sort().reverse()
}

const calculateCurrentStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  let startDate: Date
  let streak = 0

  if (dates[0] === today) {
    startDate = new Date()
    streak = 1
  } else if (dates[0] === yesterday) {
    startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    streak = 1
  } else {
    return 0
  }

  for (let i = 1; i < dates.length; i++) {
    startDate.setDate(startDate.getDate() - 1)
    const expectedDate = startDate.toISOString().split('T')[0]

    if (dates[i] === expectedDate) {
      streak++
    } else {
      break
    }
  }

  return streak
}

const calculateLongestStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0

  let maxStreak = 1
  let currentStreak = 1

  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i])
    const previousDate = new Date(dates[i - 1])
    const dayDiff =
      (previousDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000)

    if (dayDiff === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return maxStreak
}

const formatTimeAgo = (date: Date, now: Date): string => {
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  }
}
