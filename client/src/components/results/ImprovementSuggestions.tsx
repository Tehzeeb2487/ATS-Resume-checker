import type { ImprovementSuggestion } from '../../types/analysis'
import { LightbulbIcon } from '../ui/Icons'

interface ImprovementSuggestionsProps {
  suggestions: ImprovementSuggestion[]
}

function getPriorityLabel(priority?: string): string {
  if (!priority) return 'Medium Priority'
  const lower = priority.toLowerCase()
  if (lower === 'high') return 'High Priority'
  if (lower === 'low') return 'Low Priority'
  return 'Medium Priority'
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

      {!suggestions || suggestions.length === 0 ? (
        <p className="card-section__empty">No suggestions generated.</p>
      ) : (
        <ul className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.id || index} className="suggestion-item">
              <div className="suggestion-item__header">
                <span className="suggestion-item__number" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="suggestion-item__meta">
                  <h4 className="suggestion-item__title">{suggestion.title}</h4>
                  <span
                    className={`suggestion-item__priority suggestion-item__priority--${(
                      suggestion.priority || 'medium'
                    ).toLowerCase()}`}
                  >
                    {getPriorityLabel(suggestion.priority)}
                  </span>
                </div>
              </div>
              <p className="suggestion-item__description">{suggestion.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}


