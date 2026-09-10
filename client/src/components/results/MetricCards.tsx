import type { AnalysisMetrics } from '../../types/analysis'

interface MetricCardsProps {
  metrics: AnalysisMetrics
}

const METRIC_CONFIG = [
  { key: 'overallMatch' as const, label: 'Overall Match' },
  { key: 'keywordMatch' as const, label: 'Keyword Match' },
  { key: 'skillsMatch' as const, label: 'Skills Match' },
  { key: 'experienceRelevance' as const, label: 'Experience Relevance' },
]

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="metric-cards">
      {METRIC_CONFIG.map(({ key, label }) => (
        <div key={key} className="metric-card">
          <p className="metric-card__label">{label}</p>
          <p className="metric-card__value">{metrics[key]}%</p>
          <div className="metric-card__bar" aria-hidden="true">
            <div
              className="metric-card__bar-fill"
              style={{ width: `${metrics[key]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
