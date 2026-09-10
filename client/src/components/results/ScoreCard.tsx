import type { AnalysisResult } from '../../types/analysis'
import { CircularProgress } from '../ui/CircularProgress'

interface ScoreCardProps {
  result: AnalysisResult
}

export function ScoreCard({ result }: ScoreCardProps) {
  const getScoreTitle = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 70) return 'Good Match'
    if (score >= 50) return 'Moderate Match'
    return 'Needs Improvement'
  }

  return (
    <div className="score-card">
      <div className="score-card__visual">
        <CircularProgress value={result.score} size={140} strokeWidth={10} label="ATS match score" />
      </div>
      <div className="score-card__content">
        <h3 className="score-card__title">{getScoreTitle(result.score)}</h3>
        <p className="score-card__interpretation">{result.interpretation}</p>
        <p className="score-card__disclaimer">
          This score reflects keyword and content alignment suggestions — tailored for modern ATS systems.
        </p>
      </div>
    </div>
  )
}

