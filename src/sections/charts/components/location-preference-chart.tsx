import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { LocationData } from '../types'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface LocationPreferenceChartProps {
  data: LocationData[]
}

export const LocationPreferenceChart: React.FC<
  LocationPreferenceChartProps
> = ({ data }) => {
  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(236, 72, 153, 0.8)'
  ]

  const borderColors = [
    'rgba(59, 130, 246, 1)',
    'rgba(239, 68, 68, 1)',
    'rgba(245, 158, 11, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(139, 92, 246, 1)',
    'rgba(236, 72, 153, 1)'
  ]

  const chartData = {
    labels: data.map((item) => item.location),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: borderColors.slice(0, data.length),
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#cbd5e1',
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Gym Location Preferences',
        color: '#f8fafc',
        font: {
          size: 16,
          weight: 'bold' as const
        },
        padding: {
          bottom: 24
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const item = data[context.dataIndex]
            return `${item.location}: ${item.count} visits (${item.percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className="h-80">
      <Pie data={chartData} options={options} />
    </div>
  )
}
