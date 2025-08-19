import { format } from 'date-fns'
import React, { useState } from 'react'
import { CalendarGrid } from './CalendarGrid'
import { BinaryLegend, StreakLegend } from './Legend'
import { StatCard } from './StatCard'
import { ToggleButton } from './ToggleButton'
import { useCalendarData } from './useCalendarData'

export const CalendarHeatmap: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )
  const [showStreakMode, setShowStreakMode] = useState<boolean>(false)

  const { heatmapData, dateRange, stats, availableYears, isLoading } =
    useCalendarData(selectedYear)

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
          <h2 className="text-2xl font-bold text-text-950">
            Activity Calendar
          </h2>
          <p className="text-text-900 mt-1">
            Your gym check-in history for {selectedYear}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-primary-200 p-1 rounded-lg">
            <ToggleButton
              active={!showStreakMode}
              onClick={() => setShowStreakMode(false)}
            >
              Binary
            </ToggleButton>
            <ToggleButton
              active={showStreakMode}
              onClick={() => setShowStreakMode(true)}
            >
              Streak
            </ToggleButton>
          </div>

          <div className="flex gap-1 bg-primary-200 p-1 rounded-lg overflow-x-auto">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard value={stats.total} label="Total visits" />
        <StatCard value={`${stats.completionRate}%`} label="Completion rate" />
        <StatCard value={stats.currentStreak} label="Current streak" />
        <StatCard value={stats.bestStreak} label="Best streak" />
      </div>

      <div className="bg-primary-200 p-6 rounded-lg">
        <div className="overflow-x-auto">
          <CalendarGrid
            heatmapData={heatmapData}
            dateRange={dateRange}
            showStreakMode={showStreakMode}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-secondary-700 gap-4">
          <div className="text-sm text-text-950">
            {format(dateRange.start, 'MMM d, yyyy')} -{' '}
            {format(dateRange.end, 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {showStreakMode ? <StreakLegend /> : <BinaryLegend />}
          </div>
        </div>
      </div>
    </div>
  )
}
