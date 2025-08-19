import clsx from 'clsx'
import { addDays, eachDayOfInterval, format, getDay, subDays } from 'date-fns'
import React from 'react'
import { useCalendarColors } from '../hooks'
import { HeatmapData } from '../types'

const monthOrder = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

interface CalendarGridProps {
  heatmapData: HeatmapData[]
  dateRange: { start: Date; end: Date }
  showStreakMode: boolean
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  heatmapData,
  dateRange,
  showStreakMode
}) => {
  const { getBinaryColor, getStreakColor } = useCalendarColors()

  const weeks: HeatmapData[][] = []
  let currentWeek: HeatmapData[] = []

  const startOfFirstWeek = subDays(dateRange.start, getDay(dateRange.start))
  const endOfLastWeek = addDays(dateRange.end, 6 - getDay(dateRange.end))
  const allDays = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek
  })
  const dataMap = new Map(heatmapData.map((d) => [d.date, d]))

  allDays.forEach((date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    const dayData = dataMap.get(dateKey) || {
      date: dateKey,
      count: 0,
      hasVisit: false
    }
    currentWeek.push(dayData)

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })

  const monthLabels: { month: string; position: number }[] = []
  const monthPositions = new Map<string, number>()

  weeks.forEach((week, weekIndex) => {
    week.forEach((day) => {
      if (day.date) {
        const date = new Date(day.date)
        if (date.getFullYear() === dateRange.start.getFullYear()) {
          const monthKey = format(date, 'MMM')
          if (!monthPositions.has(monthKey)) {
            monthPositions.set(monthKey, weekIndex)
          }
        }
      }
    })
  })

  monthOrder.forEach((month) => {
    if (monthPositions.has(month)) {
      monthLabels.push({ month, position: monthPositions.get(month)! })
    }
  })

  return (
    <div className="space-y-4 min-w-[800px]">
      <div className="relative h-6" style={{ marginLeft: '52px' }}>
        {monthLabels.map(({ month, position }) => (
          <span
            key={`${month}-${position}`}
            className="absolute text-xs font-medium text-text-200"
            style={{
              left: `${position * 20}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <div
          className="flex flex-col justify-start text-xs text-text-200 w-10"
          style={{ height: `${7 * 20}px` }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <span key={day} className="h-5 flex items-center">
              {day}
            </span>
          ))}
        </div>

        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            gridTemplateRows: 'repeat(7, 1fr)'
          }}
        >
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={clsx(
                  'w-4 h-4 rounded-sm border border-secondary-700',
                  showStreakMode
                    ? getStreakColor(day)
                    : getBinaryColor(day.hasVisit)
                )}
                title={
                  day.date
                    ? showStreakMode && day.streakLength && day.streakLength > 1
                      ? `${day.date}: Day ${day.streakPosition} of ${day.streakLength}-day streak`
                      : `${day.date}: ${day.count} ${
                          day.count === 1 ? 'visit' : 'visits'
                        }`
                    : ''
                }
                style={{ gridColumn: weekIndex + 1, gridRow: dayIndex + 1 }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
