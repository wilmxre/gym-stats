import React from 'react'

interface LegendItemProps {
  label: string
  color: string
  className?: string
}

const LegendItem: React.FC<LegendItemProps> = ({ label, color, className }) => (
  <>
    <span className="text-sm text-white/90 whitespace-nowrap">{label}:</span>
    <div
      className={`w-4 h-4 rounded-sm ${color} flex-shrink-0 ${className || ''}`}
    />
  </>
)

export const BinaryLegend: React.FC = () => (
  <>
    <LegendItem label="No visits" color="bg-primary-900/20" />
    <div className="w-0.5 h-4 bg-white/30 mx-2" />
    <LegendItem label="Has visits" color="bg-[#ec4899]" />
    <div className="w-0.5 h-4 bg-white/30 mx-2" />
    <LegendItem
      label="Today"
      color="bg-transparent"
      className="ring-1 ring-white-400 ring-offset-1 ring-offset-white-400 mr-0.5"
    />
  </>
)
