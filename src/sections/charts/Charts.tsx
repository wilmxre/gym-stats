import React from 'react'
import { ToggleButton } from '../activity-calendar/components'
import {
  LocationPreferenceChart,
  MonthlyVolumeChart,
  TimePreferenceChart,
  WeeklyPatternChart
} from './components'
import { useChartsData } from './hooks'

export const Charts: React.FC = () => {
  const {
    weeklyPattern,
    timePreferences,
    locationPreferences,
    monthlyVolume,
    availablePeriods,
    selectedPeriod,
    setSelectedPeriod
  } = useChartsData()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-50">Workout Analytics</h2>
          <p className="text-text-50 font-medium mt-1">
            Insights into your workout patterns for{' '}
            {selectedPeriod.label.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-background-900/30 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl p-1.5">
            {availablePeriods.map((period) => (
              <ToggleButton
                key={`${period.type}-${period.year || 'default'}`}
                active={
                  selectedPeriod.type === period.type &&
                  selectedPeriod.year === period.year
                }
                onClick={() => setSelectedPeriod(period)}
              >
                {period.label}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
          <WeeklyPatternChart data={weeklyPattern} />
        </div>

        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
          <TimePreferenceChart data={timePreferences} />
        </div>

        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
          <LocationPreferenceChart data={locationPreferences} />
        </div>

        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
          <MonthlyVolumeChart data={monthlyVolume} />
        </div>
      </div>
    </div>
  )
}
