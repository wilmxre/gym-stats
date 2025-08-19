import React from 'react'

const LegendItem: React.FC<{ label: string; color: string }> = ({
  label,
  color
}) => (
  <>
    <span className="text-sm text-text-950 whitespace-nowrap">{label}:</span>
    <div className={`w-4 h-4 rounded-sm ${color} flex-shrink-0`} />
  </>
)

export const StreakLegend: React.FC = () => (
  <>
    <LegendItem label="1 day" color="bg-primary-800" />
    <span className="ml-2" />
    <LegendItem label="2 days" color="bg-primary-600" />
    <span className="ml-2" />
    <LegendItem label="3 days" color="bg-primary-500" />
    <span className="ml-2" />
    <LegendItem label="4 days" color="bg-background-400/75" />
    <span className="ml-2" />
    <LegendItem label="5+ days" color="bg-accent-500" />
  </>
)

export const BinaryLegend: React.FC = () => (
  <>
    <LegendItem label="No visits" color="bg-background-400/75" />
    <LegendItem label="Has visits" color="bg-primary-700" />
  </>
)
