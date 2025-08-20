import { format, getDay, getHours, parse } from 'date-fns'
import { useMemo } from 'react'
import { useAllCheckins } from '../../../hooks/useAllCheckins'
import {
  ChartData,
  LocationData,
  MonthlyVolumeData,
  TimePreferenceData,
  WeeklyPatternData
} from '../types'

export const useChartsData = (): ChartData => {
  const { allCheckins, isLoading } = useAllCheckins()

  return useMemo(() => {
    if (isLoading || !allCheckins.length) {
      return {
        weeklyPattern: [],
        timePreferences: [],
        locationPreferences: [],
        monthlyVolume: []
      }
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

    allCheckins.forEach((checkin) => {
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
      { label: 'Early Morning (5-8 AM)', start: 5, end: 8 },
      { label: 'Morning (8-11 AM)', start: 8, end: 11 },
      { label: 'Midday (11 AM-2 PM)', start: 11, end: 14 },
      { label: 'Afternoon (2-5 PM)', start: 14, end: 17 },
      { label: 'Evening (5-8 PM)', start: 17, end: 20 },
      { label: 'Night (8-11 PM)', start: 20, end: 23 }
    ]

    const timePreferenceMap = new Map<string, number>()
    timeSlots.forEach((slot) => timePreferenceMap.set(slot.label, 0))

    allCheckins.forEach((checkin) => {
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
    allCheckins.forEach((checkin) => {
      if (checkin.club_name) {
        locationMap.set(
          checkin.club_name,
          (locationMap.get(checkin.club_name) || 0) + 1
        )
      }
    })

    const totalCheckins = allCheckins.length
    const locationPreferences: LocationData[] = Array.from(
      locationMap.entries()
    ).map(([location, count]) => ({
      location,
      count,
      percentage: Math.round((count / totalCheckins) * 100)
    }))

    // Monthly Volume
    const monthlyMap = new Map<string, number>()
    allCheckins.forEach((checkin) => {
      const date = new Date(checkin.date_checkin)
      const monthKey = format(date, 'yyyy-MM')
      monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1)
    })

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
      .sort((a, b) => a.year - b.year || a.month.localeCompare(b.month))

    return {
      weeklyPattern,
      timePreferences,
      locationPreferences,
      monthlyVolume
    }
  }, [allCheckins, isLoading])
}
