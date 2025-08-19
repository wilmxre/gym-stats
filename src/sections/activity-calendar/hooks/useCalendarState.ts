import { useState } from 'react'

export const useCalendarState = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )
  const [showStreakMode, setShowStreakMode] = useState<boolean>(false)

  const toggleMode = () => setShowStreakMode(!showStreakMode)

  return {
    selectedYear,
    setSelectedYear,
    showStreakMode,
    setShowStreakMode,
    toggleMode
  }
}
