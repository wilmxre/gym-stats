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
import { WeeklyPatternData } from '../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface WeeklyPatternChartProps {
  data: WeeklyPatternData[]
}

export const WeeklyPatternChart: React.FC<WeeklyPatternChartProps> = ({
  data
}) => {
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: 'Workout Sessions',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
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
        text: 'Weekly Workout Pattern',
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
        borderColor: 'rgba(139, 92, 246, 0.3)',
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
          color: '#cbd5e1'
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
