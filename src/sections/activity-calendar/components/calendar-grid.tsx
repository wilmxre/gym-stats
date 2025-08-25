import clsx from 'clsx'
import { addDays, eachDayOfInterval, format, getDay, subDays } from 'date-fns'
import React from 'react'
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
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  heatmapData,
  dateRange
}) => {
  const today = format(new Date(), 'yyyy-MM-dd')
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
    <div className="space-y-2 min-w-[800px]">
      <div className="relative h-8 ml-12">
        {monthLabels.map(({ month, position }) => (
          <span
            key={`${month}-${position}`}
            className="absolute text-sm font-semibold text-white"
            style={{
              left: `${position * 20 + 10}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <div
          className="flex flex-col justify-start font-semibold text-xs text-white w-12"
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
            week.map((day, dayIndex) => {
              const isToday = day.date === today
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={clsx(
                    'w-4 h-4 rounded-sm relative',
                    day.hasVisit ? 'bg-[#ec4899]' : 'bg-primary-900/20',
                    isToday &&
                      'ring-1 ring-white-500 ring-offset-1 ring-offset-white-500'
                  )}
                  title={
                    day.date
                      ? `${day.date}${isToday ? ' (Today)' : ''}: ${
                          day.count
                        } ${day.count === 1 ? 'visit' : 'visits'}`
                      : ''
                  }
                  style={{ gridColumn: weekIndex + 1, gridRow: dayIndex + 1 }}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
