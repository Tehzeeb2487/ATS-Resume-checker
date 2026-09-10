import type { JobDescriptionCategory } from '../../types/analysis'

interface JobDescriptionMatchingProps {
  categories: JobDescriptionCategory[]
}

export function JobDescriptionMatching({ categories }: JobDescriptionMatchingProps) {
  return (
    <section className="card-section" aria-labelledby="jd-match-heading">
      <h3 id="jd-match-heading" className="card-section__title">
        Job Description Matching
      </h3>
      <p className="card-section__subtitle">
        How your resume aligns across key categories for this role.
      </p>
      <div className="jd-match-grid">
        {categories.map((category) => (
          <article key={category.id} className="jd-match-card">
            <div className="jd-match-card__header">
              <h4 className="jd-match-card__label">{category.label}</h4>
              <span className="jd-match-card__score">{category.score}%</span>
            </div>
            <div
              className="jd-match-card__bar"
              role="progressbar"
              aria-valuenow={category.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${category.label} match`}
            >
              <div
                className="jd-match-card__bar-fill"
                style={{ width: `${category.score}%` }}
              />
            </div>
            <p className="jd-match-card__summary">{category.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
