import { WarningIcon } from '../ui/Icons'

interface MissingKeywordsProps {
  keywords: string[]
}

export function MissingKeywords({ keywords }: MissingKeywordsProps) {
  return (
    <section className="card-section" aria-labelledby="missing-heading">
      <div className="card-section__header">
        <span className="card-section__icon-badge card-section__icon-badge--warning">
          <WarningIcon size={14} />
        </span>
        <h3 id="missing-heading" className="card-section__title">
          Missing / Weak Keywords
        </h3>
      </div>

      {keywords.length === 0 ? (
        <p className="card-section__empty">No significant keyword gaps detected.</p>
      ) : (
        <ul className="keyword-list keyword-list--missing">
          {keywords.map((keyword) => (
            <li key={keyword} className="keyword-tag keyword-tag--missing">
              <WarningIcon size={12} />
              <span>{keyword}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

