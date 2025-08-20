import React from 'react'
import {
  LocationPreferenceChart,
  MonthlyVolumeChart,
  TimePreferenceChart,
  WeeklyPatternChart
} from './components'
import { useChartsData } from './hooks'

export const Charts: React.FC = () => {
  const { weeklyPattern, timePreferences, locationPreferences, monthlyVolume } =
    useChartsData()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-50 mb-6">
          Workout Analytics
        </h2>
        <p className="text-text-200 mb-8">
          Insights into your workout patterns and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Pattern */}
        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
          <WeeklyPatternChart data={weeklyPattern} />
        </div>

        {/* Time Preferences */}
        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
          <TimePreferenceChart data={timePreferences} />
        </div>

        {/* Location Preferences */}
        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
          <LocationPreferenceChart data={locationPreferences} />
        </div>

        {/* Monthly Volume */}
        <div className="p-6 bg-background-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
          <MonthlyVolumeChart data={monthlyVolume} />
        </div>
      </div>
    </div>
  )
}
