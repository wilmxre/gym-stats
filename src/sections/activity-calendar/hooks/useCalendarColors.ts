import { HeatmapData } from '../types'

export const useCalendarColors = () => {
  const getBinaryColor = (hasVisit: boolean): string => {
    return hasVisit ? 'bg-accent-500' : 'bg-background-900/50'
  }

  const getStreakColor = (day: HeatmapData): string => {
    if (!day.hasVisit) return 'bg-background-800'

    const streakLength = day.streakLength || 1

    if (streakLength === 1) return 'bg-primary-800'
    if (streakLength === 2) return 'bg-primary-600'
    if (streakLength === 3) return 'bg-primary-500'
    if (streakLength === 4) return 'bg-primary-400'
    if (streakLength >= 5) return 'bg-accent-500'

    return 'bg-primary-500'
  }

  return {
    getBinaryColor,
    getStreakColor
  }
}
