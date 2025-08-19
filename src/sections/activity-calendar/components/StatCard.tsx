import React from 'react'

interface StatCardProps {
  value: number | string
  label: string
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="bg-background-900 p-4 rounded-xl">
    <div className="text-2xl font-bold text-text-50">{value}</div>
    <div className="text-sm text-text-200">{label}</div>
  </div>
)
