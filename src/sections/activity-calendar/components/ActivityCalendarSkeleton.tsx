import React from 'react'

export const ActivityCalendarSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-black/20 backdrop-blur-md shadow-xl rounded-xl"
          >
            <div className="h-7 bg-primary-900/30 rounded w-16 mb-2"></div>
            <div className="h-4 bg-primary-900/30 rounded w-20"></div>
          </div>
        ))}
      </div>

      <div className="p-6 py-7 bg-black/20 backdrop-blur-md shadow-xl rounded-xl">
        <div className="overflow-x-auto">
          <div className="space-y-2 min-w-[800px]">
            <div className="flex justify-between items-center h-4 mb-6 ml-12 pr-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-primary-900/30 rounded w-8"
                ></div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-start w-12 space-y-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-primary-900/30 rounded w-8"
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
                    className="w-4 h-4 bg-primary-900/30 rounded-sm"
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
          <div className="h-4 bg-primary-900/30 rounded w-48"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-primary-900/30 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
