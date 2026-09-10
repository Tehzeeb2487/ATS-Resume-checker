import { CheckIcon } from '../ui/Icons'

interface MatchedKeywordsProps {
  keywords: string[]
}

export function MatchedKeywords({ keywords }: MatchedKeywordsProps) {
  if (keywords.length === 0) {
    return (
      <section className="card-section" aria-labelledby="matched-heading">
        <h3 id="matched-heading" className="card-section__title">
          Matched Skills &amp; Keywords
        </h3>
        <p className="card-section__empty">No matched keywords detected.</p>
      </section>
    )
  }

  return (
    <section className="card-section" aria-labelledby="matched-heading">
      <h3 id="matched-heading" className="card-section__title">
        Matched Skills &amp; Keywords
      </h3>
      <ul className="keyword-list keyword-list--matched">
        {keywords.map((keyword) => (
          <li key={keyword} className="keyword-tag keyword-tag--matched">
            <CheckIcon size={14} />
            <span>{keyword}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
