import { WarningIcon } from '../ui/Icons'

interface MissingKeywordsProps {
  keywords: string[]
}

export function MissingKeywords({ keywords }: MissingKeywordsProps) {
  if (keywords.length === 0) {
    return (
      <section className="card-section" aria-labelledby="missing-heading">
        <h3 id="missing-heading" className="card-section__title">
          Missing / Weak Keywords
        </h3>
        <p className="card-section__empty">No significant keyword gaps detected.</p>
      </section>
    )
  }

  return (
    <section className="card-section" aria-labelledby="missing-heading">
      <h3 id="missing-heading" className="card-section__title">
        Missing / Weak Keywords
      </h3>
      <p className="card-section__subtitle">
        Suggestions based on the job description — not guaranteed ATS requirements.
      </p>
      <ul className="keyword-list keyword-list--missing">
        {keywords.map((keyword) => (
          <li key={keyword} className="keyword-tag keyword-tag--missing">
            <WarningIcon size={14} />
            <span>{keyword}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
