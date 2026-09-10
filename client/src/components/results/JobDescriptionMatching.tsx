import type { JobDescriptionCategory } from '../../types/analysis'
import { TargetIcon } from '../ui/Icons'

interface JobDescriptionMatchingProps {
  categories: JobDescriptionCategory[]
}

export function JobDescriptionMatching({ categories }: JobDescriptionMatchingProps) {
  return (
    <section className="card-section" aria-labelledby="jd-match-heading">
      <div className="card-section__header">
        <span className="card-section__icon-badge card-section__icon-badge--purple">
          <TargetIcon size={16} />
        </span>
        <h3 id="jd-match-heading" className="card-section__title">
          Job Description Match
        </h3>
      </div>

      <div className="jd-match-list">
        {categories.map((category) => (
          <div key={category.id} className="jd-match-item">
            <div className="jd-match-item__header">
              <span className="jd-match-item__label">{category.label}</span>
              <span className="jd-match-item__score">{category.score}%</span>
            </div>
            <div
              className="jd-match-item__bar"
              role="progressbar"
              aria-valuenow={category.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${category.label} match`}
            >
              <div
                className="jd-match-item__bar-fill"
                style={{ width: `${category.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

