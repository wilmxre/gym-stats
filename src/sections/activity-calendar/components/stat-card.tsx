import React from 'react'

interface StatCardProps {
  value: number | string
  label: string
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="p-4 bg-black/20 backdrop-blur-md shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:bg-black/30 hover:border-accent-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-1">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-white/90">{label}</div>
  </div>
)
