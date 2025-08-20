import React from 'react'

interface StatCardProps {
  value: number | string
  label: string
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="p-4 bg-background-900/40 backdrop-blur-md border border-accent-300/30 shadow-lg rounded-xl">
    <div className="text-2xl font-bold text-text-50">{value}</div>
    <div className="text-sm text-text-100">{label}</div>
  </div>
)
