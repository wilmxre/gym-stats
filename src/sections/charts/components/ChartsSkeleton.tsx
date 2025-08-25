import React from 'react'

export const ChartsSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 bg-primary-900/30 rounded w-48 mb-2"></div>
          <div className="h-5 bg-primary-900/30 rounded w-64"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-background-900/50 backdrop-blur-md shadow-lg rounded-xl p-1.5 h-[48px]">
            <div className="w-14 bg-transparent"></div>
            <div className="h-[32px] w-14 self-center bg-primary-900/30 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Pattern Chart Skeleton */}
        <div className="p-6 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
          <div className="space-y-4">
            <div className="h-6 bg-primary-900/30 rounded w-40"></div>
            <div className="h-64 bg-primary-900/30 rounded-lg"></div>
          </div>
        </div>

        {/* Time Preference Chart Skeleton */}
        <div className="p-6 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
          <div className="space-y-4">
            <div className="h-6 bg-primary-900/30 rounded w-36"></div>
            <div className="h-64 bg-primary-900/30 rounded-lg"></div>
          </div>
        </div>

        {/* Location Preference Chart Skeleton */}
        <div className="p-6 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
          <div className="space-y-4">
            <div className="h-6 bg-primary-900/30 rounded w-44"></div>
            <div className="h-64 bg-primary-900/30 rounded-lg"></div>
          </div>
        </div>

        {/* Monthly Volume Chart Skeleton */}
        <div className="p-6 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
          <div className="space-y-4">
            <div className="h-6 bg-primary-900/30 rounded w-38"></div>
            <div className="h-64 bg-primary-900/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
