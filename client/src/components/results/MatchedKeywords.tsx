import { CheckIcon } from '../ui/Icons'

interface MatchedKeywordsProps {
  keywords: string[]
}

export function MatchedKeywords({ keywords }: MatchedKeywordsProps) {
  return (
    <section className="card-section" aria-labelledby="matched-heading">
      <div className="card-section__header">
        <span className="card-section__icon-badge card-section__icon-badge--success">
          <CheckIcon size={14} />
        </span>
        <h3 id="matched-heading" className="card-section__title">
          Matched Skills
        </h3>
      </div>

      {keywords.length === 0 ? (
        <p className="card-section__empty">No matched keywords detected.</p>
      ) : (
        <ul className="keyword-list keyword-list--matched">
          {keywords.map((keyword) => (
            <li key={keyword} className="keyword-tag keyword-tag--matched">
              <CheckIcon size={12} />
              <span>{keyword}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

