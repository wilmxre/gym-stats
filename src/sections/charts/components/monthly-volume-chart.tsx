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
import { MonthlyVolumeData } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface MonthlyVolumeChartProps {
  data: MonthlyVolumeData[]
}

export const MonthlyVolumeChart: React.FC<MonthlyVolumeChartProps> = ({
  data
}) => {
  // Calculate dynamic width based on number of months
  // Give more space per month when there are many months
  const minBarWidth = 40 // Minimum width per bar
  const calculatedWidth = Math.max(600, data.length * minBarWidth) // Minimum 600px or 40px per month
  const needsScroll = data.length > 12 // More than 12 months needs scrolling

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Workouts',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgba(236, 72, 153, 1)',
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
        text: 'Monthly Workout Volume',
        color: '#f8fafc',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        borderWidth: 1,
        callbacks: {
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
          maxRotation: needsScroll ? 45 : 45,
          minRotation: needsScroll ? 45 : 0
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
      {needsScroll ? (
        <div className="h-full overflow-x-auto">
          <div style={{ width: `${calculatedWidth}px`, height: '100%' }}>
            <Bar data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  )
}
