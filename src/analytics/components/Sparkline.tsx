interface SparklineProps {
  data: number[]
  height?: number
  color?: string
  showDots?: boolean
}

export const Sparkline = ({
  data,
  height = 24,
  color = 'currentColor',
  showDots = false
}: SparklineProps) => {
  if (data.length === 0) {
    return <div className="w-full h-6 bg-secondary-800 rounded opacity-50" />
  }

  const max = Math.max(...data, 1) // Avoid division by zero
  const min = Math.min(...data)
  const range = max - min || 1

  const width = 200
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="w-full">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="opacity-60"
        />
        {showDots &&
          data.map((value, index) => {
            const x = (index / (data.length - 1)) * width
            const y = height - ((value - min) / range) * height
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
                className="opacity-80"
              />
            )
          })}
      </svg>
    </div>
  )
}
