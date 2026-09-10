interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
}

export function CircularProgress({
  value,
  max = 100,
  size = 160,
  strokeWidth = 10,
  label = 'Match score',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const normalized = Math.min(Math.max(value, 0), max)
  const offset = circumference - (normalized / max) * circumference
  const center = size / 2

  return (
    <div
      className="circular-progress"
      role="img"
      aria-label={`${label}: ${normalized} out of ${max}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="circular-progress__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="circular-progress__fill"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="circular-progress__content">
        <span className="circular-progress__value">{normalized}</span>
        <span className="circular-progress__max">/ {max}</span>
      </div>
    </div>
  )
}
