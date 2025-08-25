import { format } from 'date-fns'
import React from 'react'
import {
  ActivityCalendarSkeleton,
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
    return <ActivityCalendarSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Activity Calendar
          </h2>
          <p className="text-white font-semibold mt-1">
            Your gym check-in history for {selectedYear}
          </p>
        </div>

        <div className="flex items-center gap-4 justify-end sm:justify-start">
          <div className="flex gap-1 bg-black/30 backdrop-blur-md shadow-xl rounded-xl p-1.5">
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

      <div className="p-6 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
        <div className="overflow-x-auto">
          <CalendarGrid
            heatmapData={heatmapData}
            dateRange={dateRange}
            selectedYear={selectedYear}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 gap-4 border-t border-white/30">
          <div className="text-sm text-white/90">
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
