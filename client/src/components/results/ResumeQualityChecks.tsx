import type { ResumeQualityCheck } from '../../types/analysis'
import { CheckIcon, WarningIcon, XIcon } from '../ui/Icons'

interface ResumeQualityChecksProps {
  checks: ResumeQualityCheck[]
}

function StatusIcon({ status }: { status: ResumeQualityCheck['status'] }) {
  if (status === 'pass') return <CheckIcon size={16} />
  if (status === 'warning') return <WarningIcon size={16} />
  return <XIcon size={16} />
}

export function ResumeQualityChecks({ checks }: ResumeQualityChecksProps) {
  return (
    <section className="card-section" aria-labelledby="quality-heading">
      <h3 id="quality-heading" className="card-section__title">
        Resume Quality Checks
      </h3>
      <ul className="quality-list">
        {checks.map((check) => (
          <li
            key={check.id}
            className={`quality-item quality-item--${check.status}`}
          >
            <span className="quality-item__icon" aria-hidden="true">
              <StatusIcon status={check.status} />
            </span>
            <div>
              <p className="quality-item__label">{check.label}</p>
              {check.detail && <p className="quality-item__detail">{check.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
