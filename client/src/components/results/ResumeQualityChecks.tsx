import type { ResumeQualityCheck } from '../../types/analysis'
import { CheckIcon, DocumentIcon, WarningIcon, XIcon } from '../ui/Icons'

interface ResumeQualityChecksProps {
  checks: ResumeQualityCheck[]
}

function StatusIcon({ status }: { status: ResumeQualityCheck['status'] }) {
  if (status === 'pass') return <CheckIcon size={14} />
  if (status === 'warning') return <WarningIcon size={14} />
  return <XIcon size={14} />
}

export function ResumeQualityChecks({ checks }: ResumeQualityChecksProps) {
  return (
    <section className="card-section" aria-labelledby="quality-heading">
      <div className="card-section__header">
        <span className="card-section__icon-badge card-section__icon-badge--blue">
          <DocumentIcon size={16} />
        </span>
        <h3 id="quality-heading" className="card-section__title">
          Resume Quality Check
        </h3>
      </div>

      <ul className="quality-list">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`quality-item quality-item--${check.status}`}
          >
            <span className="quality-item__icon" aria-hidden="true">
              <StatusIcon status={check.status} />
            </span>
            <span className="quality-item__label">{check.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

