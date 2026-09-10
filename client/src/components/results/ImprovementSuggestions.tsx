import type { ImprovementSuggestion } from '../../types/analysis'
import { LightbulbIcon } from '../ui/Icons'

interface ImprovementSuggestionsProps {
  suggestions: ImprovementSuggestion[]
}

const PRIORITY_LABELS: Record<ImprovementSuggestion['priority'], string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
}

export function ImprovementSuggestions({ suggestions }: ImprovementSuggestionsProps) {
  return (
    <section className="card-section" aria-labelledby="suggestions-heading">
      <div className="card-section__header">
        <span className="card-section__icon-badge card-section__icon-badge--info">
          <LightbulbIcon size={16} />
        </span>
        <h3 id="suggestions-heading" className="card-section__title">
          Resume Improvement Suggestions
        </h3>
      </div>

      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <li key={suggestion.id} className="suggestion-item">
            <div className="suggestion-item__header">
              <span className="suggestion-item__number" aria-hidden="true">
                {index + 1}
              </span>
              <div className="suggestion-item__meta">
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

