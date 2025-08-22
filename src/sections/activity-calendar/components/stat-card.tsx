import React from 'react'

interface StatCardProps {
  value: number | string
  label: string
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="p-4 bg-black/20 backdrop-blur-md border border-accent-400 shadow-xl rounded-xl">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-white/90">{label}</div>
  </div>
)
