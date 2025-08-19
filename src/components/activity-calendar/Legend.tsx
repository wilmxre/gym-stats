import React from 'react'

const LegendItem: React.FC<{ label: string; color: string }> = ({
  label,
  color
}) => (
  <>
    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
      {label}:
    </span>
    <div
      className={`w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700 ${color} flex-shrink-0`}
    />
  </>
)

export const StreakLegend: React.FC = () => (
  <>
    <LegendItem label="1 day" color="bg-green-100" />
    <span className="ml-2" />
    <LegendItem label="2 days" color="bg-green-300" />
    <span className="ml-2" />
    <LegendItem label="3 days" color="bg-green-500" />
    <span className="ml-2" />
    <LegendItem label="4 days" color="bg-green-700" />
    <span className="ml-2" />
    <LegendItem label="5+ days" color="bg-yellow-400" />
  </>
)

export const BinaryLegend: React.FC = () => (
  <>
    <LegendItem label="No visits" color="bg-gray-100 dark:bg-gray-800" />
    <div className="w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700 bg-green-500 dark:bg-green-600 flex-shrink-0" />
    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
      Has visits
    </span>
  </>
)
