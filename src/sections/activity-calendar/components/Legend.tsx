import React from 'react'

interface LegendItemProps {
  label: string
  color: string
}

const LegendItem: React.FC<LegendItemProps> = ({ label, color }) => (
  <>
    <span className="text-sm text-text-200 whitespace-nowrap">{label}:</span>
    <div
      className={`w-4 h-4 rounded-sm border border-secondary-700 ${color} flex-shrink-0`}
    />
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
    <LegendItem label="4 days" color="bg-primary-400" />
    <span className="ml-2" />
    <LegendItem label="5+ days" color="bg-accent-500" />
  </>
)

export const BinaryLegend: React.FC = () => (
  <>
    <LegendItem label="No visits" color="bg-background-800" />
    <div className="w-4 h-4 rounded-sm border border-secondary-700 bg-primary-500 flex-shrink-0" />
    <span className="text-sm text-text-200 whitespace-nowrap">Has visits</span>
  </>
)
