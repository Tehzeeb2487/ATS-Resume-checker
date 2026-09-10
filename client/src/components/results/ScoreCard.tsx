import type { AnalysisResult } from '../../types/analysis'
import { CircularProgress } from '../ui/CircularProgress'

interface ScoreCardProps {
  result: AnalysisResult
}

export function ScoreCard({ result }: ScoreCardProps) {
  return (
    <div className="score-card">
      <div className="score-card__visual">
        <CircularProgress value={result.score} label="ATS-style match score" />
      </div>
      <div className="score-card__content">
        <p className="score-card__label">ATS-Style Match Score</p>
        <p className="score-card__interpretation">{result.interpretation}</p>
        <p className="score-card__disclaimer">
          This score reflects keyword and content alignment suggestions — not an official
          ATS system rating.
        </p>
      </div>
    </div>
  )
}
