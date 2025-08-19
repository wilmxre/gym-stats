import React from 'react'

export const StatCard: React.FC<{ value: number | string; label: string }> = ({
  value,
  label
}) => (
  <div className="bg-primary-200 p-4 rounded-lg">
    <div className="text-2xl font-bold text-text-950">{value}</div>
    <div className="text-sm text-text-700">{label}</div>
  </div>
)
