import { format } from 'date-fns'
import React from 'react'
import {
  BinaryLegend,
  CalendarGrid,
  StatCard,
  ToggleButton
} from './components'
import { useCalendarData } from './hooks'

export const ActivityCalendar: React.FC = () => {
  const {
    selectedYear,
    setSelectedYear,
    heatmapData,
    dateRange,
    stats,
    availableYears,
    isLoading
  } = useCalendarData()

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-background-800 rounded w-1/3"></div>
        <div className="h-32 bg-background-800 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-50">Activity Calendar</h2>
          <p className="text-text-50 font-medium mt-1">
            Your gym check-in history for {selectedYear}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-1.5">
            {availableYears.map((year) => (
              <ToggleButton
                key={year}
                active={selectedYear === year}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={stats.total} label="Total visits" />
        <StatCard value={`${stats.completionRate}%`} label="Completion rate" />
        <StatCard value={stats.activeStreak} label="Active streak" />
        <StatCard value={stats.longestStreak} label="Longest streak" />
      </div>

      <div className="p-6 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
        <div className="overflow-x-auto">
          <CalendarGrid heatmapData={heatmapData} dateRange={dateRange} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 gap-4">
          <div className="text-sm text-text-200">
            {format(dateRange.start, 'MMM d, yyyy')} -{' '}
            {format(dateRange.end, 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <BinaryLegend />
          </div>
        </div>
      </div>
    </div>
  )
}
