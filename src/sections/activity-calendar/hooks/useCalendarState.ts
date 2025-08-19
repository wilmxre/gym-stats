import { useState } from 'react'

export const useCalendarState = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )

  return {
    selectedYear,
    setSelectedYear
  }
}
