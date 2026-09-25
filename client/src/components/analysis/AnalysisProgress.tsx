import type { AnalysisProgress as AnalysisProgressType } from '../../types/analysis'
import { CheckIcon, SparklesIcon } from '../ui/Icons'

interface AnalysisProgressProps {
  progress: AnalysisProgressType
}

export function AnalysisProgress({ progress }: AnalysisProgressProps) {
  const activeStage = progress.stages.find((stage) => stage.status === 'active')
  const statusMessage =
    progress.currentMessage ||
    activeStage?.label ||
    'Analyzing your resume...'

  const isComplete = progress.percent >= 100

  return (
    <section
      className="analysis-progress"
      aria-labelledby="progress-heading"
      aria-live="polite"
    >
      <div className="analysis-progress__container">
        <div className="analysis-progress__visual-card">
          <div className="analysis-progress__moving-loader" aria-hidden="true">
            <div className="analysis-progress__spinner-ring" />
            <div className="analysis-progress__pulse-core">
              <SparklesIcon size={32} />
            </div>
          </div>

          <h2 id="progress-heading" className="analysis-progress__title">
            Analyzing your resume
          </h2>

          <div
            className="analysis-progress__bar"
            role="progressbar"
            aria-label="Analysis in progress"
          >
            <div
              className={`analysis-progress__bar-fill ${
                isComplete ? 'analysis-progress__bar-fill--complete' : ''
              }`}
            />
          </div>

          <p className="analysis-progress__status">
            {statusMessage}
          </p>

          <p className="analysis-progress__subtitle">
            This may take a few moments...
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
