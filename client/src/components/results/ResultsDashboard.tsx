import type { AnalysisResult } from '../../types/analysis'
import { Button } from '../ui/Button'
import { RefreshIcon, SparklesIcon } from '../ui/Icons'
import { ImprovementSuggestions } from './ImprovementSuggestions'
import { JobDescriptionMatching } from './JobDescriptionMatching'
import { MatchedKeywords } from './MatchedKeywords'
import { MetricCards } from './MetricCards'
import { MissingKeywords } from './MissingKeywords'
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
      <div className="results-dashboard__top-bar">
        <div>
          <h2 id="results-heading" className="results-dashboard__title">
            Analysis Results
          </h2>
          <p className="results-dashboard__sub">
            Here&apos;s how your resume matches with the job description. • Completed {analyzedDate}
          </p>
        </div>

        <div className="results-dashboard__top-actions">
          <Button variant="secondary" size="md" onClick={onAnalyzeAnother}>
            <RefreshIcon size={16} />
            <span>Analyze Another Resume</span>
          </Button>
          <Button variant="primary" size="md" onClick={onStartNew}>
            <SparklesIcon size={16} />
            <span>New Analysis</span>
          </Button>
        </div>
      </div>

      {result.isDemo && (
        <div className="demo-banner" role="status">
          <strong>UI Preview:</strong> Sample results for demonstration. Connect the backend API for real analysis of your resume.
        </div>
      )}

      {/* Main Score Hero Card */}
      <div className="results-dashboard__score-wrap">
        <ScoreCard result={result} />
      </div>

      {/* 4 Metric Cards */}
      <div className="results-dashboard__metrics-wrap">
        <MetricCards metrics={result.metrics} />
      </div>

      {/* Keywords Grid (Matched Skills + Missing/Weak Keywords) */}
      <div className="results-dashboard__keywords-grid">
        <MatchedKeywords keywords={result.matchedKeywords} />
        <MissingKeywords keywords={result.missingKeywords} />
      </div>

      {/* Breakdown Grid: Suggestions + JD Match + Quality Checks */}
      <div className="results-dashboard__details-grid">
        <div className="results-dashboard__col-main">
          <ImprovementSuggestions suggestions={result.suggestions} />
        </div>
        <div className="results-dashboard__col-side">
          <JobDescriptionMatching categories={result.jobDescriptionMatching} />
          <ResumeQualityChecks checks={result.qualityChecks} />
        </div>
      </div>
    </section>
  )
}

