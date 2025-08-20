import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { TimePreferenceData } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface TimePreferenceChartProps {
  data: TimePreferenceData[]
}

export const TimePreferenceChart: React.FC<TimePreferenceChartProps> = ({
  data
}) => {
  const sortedData = [...data].sort((a, b) => a.hour - b.hour)

  const chartData = {
    labels: sortedData.map(
      (item) => item.timeSlot.split(' ')[0] + ' ' + item.timeSlot.split(' ')[1]
    ),
    datasets: [
      {
        label: 'Workout Sessions',
        data: sortedData.map((item) => item.count),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Workout Time Preferences',
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
        borderColor: 'rgba(34, 197, 94, 0.3)',
        borderWidth: 1,
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex
            return sortedData[index].timeSlot
          },
          label: (context: any) => {
            return `${context.parsed.y} workout${
              context.parsed.y !== 1 ? 's' : ''
            }`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#cbd5e1',
          maxRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#cbd5e1',
          stepSize: 1
        },
        beginAtZero: true
      }
    }
  }

  return (
    <div className="h-80">
      <Bar data={chartData} options={options} />
    </div>
  )
}
