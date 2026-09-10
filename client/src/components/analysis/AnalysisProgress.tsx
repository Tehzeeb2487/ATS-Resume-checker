import type { AnalysisProgress as AnalysisProgressType } from '../../types/analysis'
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
      <div className="analysis-progress__card">
        <div className="analysis-progress__header">
          <h2 id="progress-heading" className="analysis-progress__title">
            Analyzing your resume
          </h2>
          <span className="analysis-progress__percent">{progress.percent}%</span>
        </div>

        <div
          className="analysis-progress__bar"
          role="progressbar"
          aria-valuenow={progress.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Analysis progress"
        >
          <div
            className="analysis-progress__bar-fill"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <p className="analysis-progress__message">{progress.currentMessage}</p>

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
              <span>{stage.label}</span>
            </li>
          ))}
        </ul>

        <p className="analysis-progress__demo-note">
          UI preview — progress is simulated until the backend API is connected.
        </p>
      </div>
    </section>
  )
}
