import React from 'react'

interface LegendItemProps {
  label: string
  color: string
}

const LegendItem: React.FC<LegendItemProps> = ({ label, color }) => (
  <>
    <span className="text-sm text-text-100 whitespace-nowrap">{label}:</span>
    <div className={`w-4 h-4 rounded-sm ${color} flex-shrink-0`} />
  </>
)

export const BinaryLegend: React.FC = () => (
  <>
    <LegendItem label="No visits" color="bg-background-900/30" />
    <LegendItem label="Has visits" color="bg-accent-500" />
  </>
)
