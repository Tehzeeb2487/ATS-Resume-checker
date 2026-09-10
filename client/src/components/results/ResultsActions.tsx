import { Button } from '../ui/Button'

interface ResultsActionsProps {
  onAnalyzeAnother: () => void
  onStartNew: () => void
}

export function ResultsActions({ onAnalyzeAnother, onStartNew }: ResultsActionsProps) {
  return (
    <div className="results-actions">
      <Button variant="primary" size="lg" onClick={onAnalyzeAnother}>
        Analyze Another Resume
      </Button>
      <Button variant="secondary" size="lg" onClick={onStartNew}>
        Start New Analysis
      </Button>
    </div>
  )
}
