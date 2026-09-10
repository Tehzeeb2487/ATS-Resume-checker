import type { AnalysisResult } from '../../types/analysis'
import { ImprovementSuggestions } from './ImprovementSuggestions'
import { JobDescriptionMatching } from './JobDescriptionMatching'
import { MatchedKeywords } from './MatchedKeywords'
import { MetricCards } from './MetricCards'
import { MissingKeywords } from './MissingKeywords'
import { ResultsActions } from './ResultsActions'
import { ResumeQualityChecks } from './ResumeQualityChecks'
import { ScoreCard } from './ScoreCard'

interface ResultsDashboardProps {
  result: AnalysisResult
  onAnalyzeAnother: () => void
  onStartNew: () => void
}

export function ResultsDashboard({
  result,
  onAnalyzeAnother,
  onStartNew,
}: ResultsDashboardProps) {
  const analyzedDate = new Date(result.analyzedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <section className="results-dashboard" aria-labelledby="results-heading">
      <div className="results-dashboard__header">
        <div>
          <h2 id="results-heading" className="results-dashboard__title">
            Analysis Results
          </h2>
          <p className="results-dashboard__meta">Completed {analyzedDate}</p>
        </div>
        {result.isDemo && (
          <div className="demo-banner" role="status">
            <strong>UI Preview</strong>
            <span>
              Sample results for demonstration. Connect the backend API for real
              analysis of your resume.
            </span>
          </div>
        )}
      </div>

      <div className="results-dashboard__score">
        <ScoreCard result={result} />
      </div>

      <MetricCards metrics={result.metrics} />

      <div className="results-dashboard__keywords">
        <MatchedKeywords keywords={result.matchedKeywords} />
        <MissingKeywords keywords={result.missingKeywords} />
      </div>

      <ImprovementSuggestions suggestions={result.suggestions} />

      <JobDescriptionMatching categories={result.jobDescriptionMatching} />

      <ResumeQualityChecks checks={result.qualityChecks} />

      <ResultsActions
        onAnalyzeAnother={onAnalyzeAnother}
        onStartNew={onStartNew}
      />
    </section>
  )
}
