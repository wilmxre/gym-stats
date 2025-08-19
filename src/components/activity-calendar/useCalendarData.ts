import { eachDayOfInterval, endOfYear, format, startOfYear } from 'date-fns'
import { useMemo } from 'react'
import { useAllCheckins } from '../../hooks/useAllCheckins'
import { HeatmapData } from './types'
import { calculateStats, processStreakData } from './utils'

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
