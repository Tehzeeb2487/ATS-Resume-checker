import type { AnalysisProgress as AnalysisProgressType } from '../../types/analysis'
import { CircularProgress } from '../ui/CircularProgress'
import { CheckIcon } from '../ui/Icons'

interface AnalysisProgressProps {
  progress: AnalysisProgressType
}

export function AnalysisProgress({ progress }: AnalysisProgressProps) {
  return (
    <section
      className="analysis-progress"
      aria-labelledby="progress-heading"
      aria-live="polite"
    >
      <div className="analysis-progress__container">
        <div className="analysis-progress__visual-card">
          <div className="analysis-progress__ring-wrapper">
            <CircularProgress
              value={progress.percent}
              size={180}
              strokeWidth={12}
              label="Analysis completion"
            />
          </div>

          <h2 id="progress-heading" className="analysis-progress__title">
            Analyzing Your Resume...
          </h2>
          <p className="analysis-progress__subtitle">
            This may take a few moments. Please don&apos;t close this page.
          </p>
        </div>

        <div className="analysis-progress__stages-card">
          <h3 className="sr-only">Analysis Stages</h3>
          <ul className="analysis-progress__stages">
            {progress.stages.map((stage) => (
              <li
                key={stage.id}
                className={`analysis-progress__stage analysis-progress__stage--${stage.status}`}
              >
                <span className="analysis-progress__stage-icon" aria-hidden="true">
                  {stage.status === 'complete' ? (
                    <CheckIcon size={14} />
                  ) : stage.status === 'active' ? (
                    <span className="analysis-progress__spinner" />
                  ) : (
                    <span className="analysis-progress__dot" />
                  )}
                </span>
                <span className="analysis-progress__stage-label">
                  {stage.label}
                </span>
                <span className="analysis-progress__stage-badge">
                  {stage.status === 'complete'
                    ? 'Completed'
                    : stage.status === 'active'
                    ? 'In progress...'
                    : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

