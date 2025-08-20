export interface WeeklyPatternData {
  day: string
  count: number
}

export interface TimePreferenceData {
  timeSlot: string
  count: number
  hour: number
}

export interface LocationData {
  location: string
  count: number
  percentage: number
}

export interface MonthlyVolumeData {
  month: string
  count: number
  year: number
}

export interface ChartData {
  weeklyPattern: WeeklyPatternData[]
  timePreferences: TimePreferenceData[]
  locationPreferences: LocationData[]
  monthlyVolume: MonthlyVolumeData[]
}
