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
      <div className="animate-pulse space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="h-8 bg-background-800 rounded w-48 mb-2"></div>
            <div className="h-5 bg-background-800 rounded w-64"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl p-1.5">
              <div className="h-8 w-12 bg-background-800 rounded-lg"></div>
              <div className="h-8 w-12 bg-background-800 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl"
            >
              <div className="h-8 bg-background-800 rounded w-16 mb-2"></div>
              <div className="h-4 bg-background-800 rounded w-20"></div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
          <div className="overflow-x-auto">
            <div className="space-y-2 min-w-[800px]">
              <div className="relative h-8 ml-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-4 bg-background-800 rounded w-8"
                    style={{
                      left: `${i * 60 + 10}px`,
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col justify-start w-12 space-y-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-background-800 rounded w-8"
                    ></div>
                  ))}
                </div>

                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns: 'repeat(53, 1fr)',
                    gridTemplateRows: 'repeat(7, 1fr)'
                  }}
                >
                  {Array.from({ length: 371 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-background-800 rounded-sm"
                      style={{
                        gridColumn: Math.floor(i / 7) + 1,
                        gridRow: (i % 7) + 1
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 gap-4">
            <div className="h-4 bg-background-800 rounded w-48"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-background-800 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    )
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

        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl p-1.5">
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

      <div className="p-6 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
        <div className="overflow-x-auto">
          <CalendarGrid heatmapData={heatmapData} dateRange={dateRange} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-4 gap-4">
          <div className="text-sm text-text-100">
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
