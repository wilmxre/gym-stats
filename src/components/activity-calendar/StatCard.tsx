import React from 'react'

export const StatCard: React.FC<{ value: number | string; label: string }> = ({
  value,
  label
}) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="text-2xl font-bold text-gray-900 dark:text-white">
      {value}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
  </div>
)
