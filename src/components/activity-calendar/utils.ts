import { HeatmapData } from './types'

export const getBinaryColor = (hasVisit: boolean): string => {
  return hasVisit
    ? 'bg-primary-700 dark:bg-primary-700'
    : 'bg-background-400/75 dark:bg-background-400/75'
}

export const getStreakColor = (day: HeatmapData): string => {
  if (!day.hasVisit) return 'bg-background-800'

  const streakLength = day.streakLength || 1

  if (streakLength === 1) return 'bg-primary-800'
  if (streakLength === 2) return 'bg-primary-600'
  if (streakLength === 3) return 'bg-primary-500'
  if (streakLength === 4) return 'bg-primary-400'
  if (streakLength >= 5) return 'bg-accent-500'

  return 'bg-primary-500'
}

export const processStreakData = (
  heatmapData: HeatmapData[]
): HeatmapData[] => {
  const streakData = [...heatmapData]
  let currentStreakStart = -1

  for (let i = 0; i < streakData.length; i++) {
    if (streakData[i].hasVisit) {
      if (currentStreakStart === -1) {
        currentStreakStart = i
      }
    } else {
      if (currentStreakStart !== -1) {
        const streakLength = i - currentStreakStart
        for (let j = currentStreakStart; j < i; j++) {
          streakData[j].streakPosition = j - currentStreakStart + 1
          streakData[j].streakLength = streakLength
        }
        currentStreakStart = -1
      }
    }
  }

  if (currentStreakStart !== -1) {
    const streakLength = streakData.length - currentStreakStart
    for (let j = currentStreakStart; j < streakData.length; j++) {
      streakData[j].streakPosition = j - currentStreakStart + 1
      streakData[j].streakLength = streakLength
    }
  }

  return streakData
}

export const calculateStats = (streakData: HeatmapData[]) => {
  const totalCheckins = streakData.reduce((sum, day) => sum + day.count, 0)
  const activeDays = streakData.filter((day) => day.count > 0).length
  const completionRate = Math.round((activeDays / streakData.length) * 100)

  let currentStreak = 0
  for (let i = streakData.length - 1; i >= 0; i--) {
    if (streakData[i].count > 0) {
      currentStreak++
    } else {
      break
    }
  }

  let bestStreak = 0
  let tempStreak = 0
  streakData.forEach((day) => {
    if (day.count > 0) {
      tempStreak++
      bestStreak = Math.max(bestStreak, tempStreak)
    } else {
      tempStreak = 0
    }
  })

  return { total: totalCheckins, completionRate, currentStreak, bestStreak }
}
