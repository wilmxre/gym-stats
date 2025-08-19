import { eachDayOfInterval, endOfYear, format, startOfYear } from 'date-fns'
import { useMemo } from 'react'
import { useAllCheckins } from '../../../hooks/useAllCheckins'
import { HeatmapData } from '../types'

const processStreakData = (heatmapData: HeatmapData[]): HeatmapData[] => {
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

const calculateStats = (streakData: HeatmapData[]) => {
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

export const useCalendarData = (selectedYear: number) => {
  const { allCheckins, isLoading } = useAllCheckins()

  const { heatmapData, dateRange, stats, availableYears } = useMemo(() => {
    if (!allCheckins.length) {
      return {
        heatmapData: [],
        dateRange: { start: new Date(), end: new Date() },
        stats: { total: 0, completionRate: 0, currentStreak: 0, bestStreak: 0 },
        availableYears: [new Date().getFullYear()]
      }
    }

    const years = Array.from(
      new Set(
        allCheckins.map((checkin) =>
          new Date(checkin.date_checkin).getFullYear()
        )
      )
    ).sort((a, b) => a - b)

    const yearToUse = years.includes(selectedYear)
      ? selectedYear
      : years[0] || new Date().getFullYear()
    const startDate = startOfYear(new Date(yearToUse, 0, 1))
    const endDate = endOfYear(new Date(yearToUse, 11, 31))

    const checkinMap = new Map<string, number>()
    allCheckins.forEach((checkin) => {
      const checkinDate = new Date(checkin.date_checkin)
      if (checkinDate.getFullYear() === yearToUse) {
        const dateKey = format(checkinDate, 'yyyy-MM-dd')
        checkinMap.set(dateKey, (checkinMap.get(dateKey) || 0) + 1)
      }
    })

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const heatmapData: HeatmapData[] = days.map((date) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      const count = checkinMap.get(dateKey) || 0
      return { date: dateKey, count, hasVisit: count > 0 }
    })

    const streakData = processStreakData(heatmapData)
    const calculatedStats = calculateStats(streakData)

    return {
      heatmapData: streakData,
      dateRange: { start: startDate, end: endDate },
      stats: calculatedStats,
      availableYears: years
    }
  }, [allCheckins, selectedYear])

  return {
    heatmapData,
    dateRange,
    stats,
    availableYears,
    isLoading
  }
}
