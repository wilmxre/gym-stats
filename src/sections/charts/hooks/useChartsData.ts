import {
  format,
  getDay,
  getHours,
  parse,
  startOfYear,
  subMonths
} from 'date-fns'
import { useMemo, useState } from 'react'
import { useCheckins } from '../../../contexts/CheckinsContext'
import {
  LocationData,
  MonthlyVolumeData,
  TimePeriod,
  TimePreferenceData,
  WeeklyPatternData
} from '../types'

export const useChartsData = () => {
  const { allCheckins, isLoading } = useCheckins()
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>({
    type: 'all',
    label: 'All Time'
  })

  return useMemo(() => {
    if (isLoading || !allCheckins.length) {
      return {
        weeklyPattern: [],
        timePreferences: [],
        locationPreferences: [],
        monthlyVolume: [],
        availablePeriods: [],
        selectedPeriod,
        setSelectedPeriod
      }
    }

    // Generate available periods based on data
    const years = [
      ...new Set(
        allCheckins.map((checkin) =>
          new Date(checkin.date_checkin).getFullYear()
        )
      )
    ].sort((a, b) => b - a) // Most recent first

    const currentYear = new Date().getFullYear()
    let availablePeriods: TimePeriod[] = [
      { type: 'all', label: 'All Time' },
      { type: 'last6months', label: 'Last 6 Months' },
      { type: 'thisYear', label: currentYear.toString() }
    ]

    // Add specific years (excluding current year since we have current year above)
    years.forEach((year) => {
      if (year !== currentYear) {
        availablePeriods.push({
          type: 'specificYear',
          label: year.toString(),
          year
        })
      }
    })

    // Reverse the order so most recent periods come first (keeping "All Time" first)
    availablePeriods = [
      availablePeriods[0], // "All Time" stays first
      ...availablePeriods.slice(1).reverse() // Reverse the rest
    ]

    // Filter data based on selected period
    const now = new Date()
    let filteredCheckins = allCheckins

    switch (selectedPeriod.type) {
      case 'last6months': {
        const sixMonthsAgo = subMonths(now, 6)
        filteredCheckins = allCheckins.filter(
          (checkin) => new Date(checkin.date_checkin) >= sixMonthsAgo
        )
        break
      }
      case 'thisYear': {
        const startOfThisYear = startOfYear(now)
        filteredCheckins = allCheckins.filter(
          (checkin) => new Date(checkin.date_checkin) >= startOfThisYear
        )
        break
      }
      case 'specificYear':
        if (selectedPeriod.year) {
          filteredCheckins = allCheckins.filter(
            (checkin) =>
              new Date(checkin.date_checkin).getFullYear() ===
              selectedPeriod.year
          )
        }
        break
      case 'all':
      default:
        filteredCheckins = allCheckins
        break
    }
    // Weekly Pattern Analysis
    const weeklyPatternMap = new Map<string, number>()
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    // Initialize all days
    dayNames.forEach((day) => weeklyPatternMap.set(day, 0))

    filteredCheckins.forEach((checkin) => {
      const date = new Date(checkin.date_checkin)
      const dayOfWeek = getDay(date)
      const dayName = dayNames[dayOfWeek]
      weeklyPatternMap.set(dayName, (weeklyPatternMap.get(dayName) || 0) + 1)
    })

    const weeklyPattern: WeeklyPatternData[] = Array.from(
      weeklyPatternMap.entries()
    ).map(([day, count]) => ({
      day,
      count
    }))

    // Time Preferences Analysis
    const timeSlots = [
      { label: 'Early Morning (6-8 AM)', start: 6, end: 8 },
      { label: 'Morning (8-11 AM)', start: 8, end: 11 },
      { label: 'Afternoon (11-3 PM)', start: 11, end: 15 },
      { label: 'Evening (3-8 PM)', start: 15, end: 20 },
      { label: 'Night (8-11 PM)', start: 20, end: 23 }
    ]

    const timePreferenceMap = new Map<string, number>()
    timeSlots.forEach((slot) => timePreferenceMap.set(slot.label, 0))

    filteredCheckins.forEach((checkin) => {
      // Extract time from date_checkin which might include time
      const dateTimeStr = checkin.date_checkin
      let hour = 12 // Default to noon if no time info

      try {
        // Try to parse if it includes time
        if (dateTimeStr.includes(' ')) {
          const timePart = dateTimeStr.split(' ')[1]
          if (timePart) {
            const time = parse(timePart, 'HH:mm:ss', new Date())
            hour = getHours(time)
          }
        } else if (dateTimeStr.includes('T')) {
          // ISO format
          const date = new Date(dateTimeStr)
          hour = getHours(date)
        }
      } catch {
        // Keep default hour if parsing fails
      }

      const slot = timeSlots.find((s) => hour >= s.start && hour < s.end)
      if (slot) {
        timePreferenceMap.set(
          slot.label,
          (timePreferenceMap.get(slot.label) || 0) + 1
        )
      }
    })

    const timePreferences: TimePreferenceData[] = Array.from(
      timePreferenceMap.entries()
    ).map(([timeSlot, count]) => {
      const slot = timeSlots.find((s) => s.label === timeSlot)
      return {
        timeSlot,
        count,
        hour: slot?.start || 0
      }
    })

    // Location Preferences
    const locationMap = new Map<string, number>()
    filteredCheckins.forEach((checkin) => {
      if (checkin.club_name) {
        locationMap.set(
          checkin.club_name,
          (locationMap.get(checkin.club_name) || 0) + 1
        )
      }
    })

    const totalCheckins = filteredCheckins.length
    const locationPreferences: LocationData[] = Array.from(
      locationMap.entries()
    ).map(([location, count]) => ({
      location,
      count,
      percentage: Math.round((count / totalCheckins) * 100)
    }))

    // Monthly Volume
    const monthlyMap = new Map<string, number>()

    // First, populate with actual check-in data
    filteredCheckins.forEach((checkin) => {
      const date = new Date(checkin.date_checkin)
      const monthKey = format(date, 'yyyy-MM')
      monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1)
    })

    // For "All Time" view, fill in missing months with 0 to show complete timeline
    if (selectedPeriod.type === 'all' && filteredCheckins.length > 0) {
      const allDates = filteredCheckins.map(
        (checkin) => new Date(checkin.date_checkin)
      )
      const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
      const maxDate = new Date() // Current date

      // Generate all months from min to max date
      const currentMonth = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1
      )
      while (currentMonth <= maxDate) {
        const monthKey = format(currentMonth, 'yyyy-MM')
        if (!monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, 0)
        }
        currentMonth.setMonth(currentMonth.getMonth() + 1)
      }
    }

    const monthlyVolume: MonthlyVolumeData[] = Array.from(monthlyMap.entries())
      .map(([monthKey, count]) => {
        const [year, month] = monthKey.split('-')
        return {
          month: format(
            new Date(parseInt(year), parseInt(month) - 1),
            'MMM yyyy'
          ),
          count,
          year: parseInt(year)
        }
      })
      .sort((a, b) => {
        // Sort by year first, then by month
        if (a.year !== b.year) return a.year - b.year
        // Extract month number for proper sorting
        const monthA = new Date(
          a.year,
          new Date(`${a.month} 1, ${a.year}`).getMonth()
        ).getMonth()
        const monthB = new Date(
          b.year,
          new Date(`${b.month} 1, ${b.year}`).getMonth()
        ).getMonth()
        return monthA - monthB
      })

    return {
      weeklyPattern,
      timePreferences,
      locationPreferences,
      monthlyVolume,
      availablePeriods,
      selectedPeriod,
      setSelectedPeriod
    }
  }, [allCheckins, isLoading, selectedPeriod])
}
