import type { ImprovementSuggestion } from '../../types/analysis'

interface ImprovementSuggestionsProps {
  suggestions: ImprovementSuggestion[]
}

const PRIORITY_LABELS: Record<ImprovementSuggestion['priority'], string> = {
  high: 'High priority',
  medium: 'Medium priority',
  low: 'Low priority',
}

export function ImprovementSuggestions({ suggestions }: ImprovementSuggestionsProps) {
  return (
    <section className="card-section" aria-labelledby="suggestions-heading">
      <h3 id="suggestions-heading" className="card-section__title">
        Resume Improvement Suggestions
      </h3>
      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion.id} className="suggestion-item">
            <div className="suggestion-item__header">
              <span className="suggestion-item__number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h4 className="suggestion-item__title">{suggestion.title}</h4>
                <span
                  className={`suggestion-item__priority suggestion-item__priority--${suggestion.priority}`}
                >
                  {PRIORITY_LABELS[suggestion.priority]}
                </span>
              </div>
            </div>
            <p className="suggestion-item__description">{suggestion.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
