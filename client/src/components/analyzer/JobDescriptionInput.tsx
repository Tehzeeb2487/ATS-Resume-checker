import { useId } from 'react'
import { MAX_JOB_DESCRIPTION_LENGTH, MIN_JOB_DESCRIPTION_LENGTH } from '../../constants/validation'

interface JobDescriptionInputProps {
  value: string
  onChange: (value: string) => void
  error?: string | null
}

export function JobDescriptionInput({ value, onChange, error }: JobDescriptionInputProps) {
  const textareaId = useId()
  const charCount = value.length
  const isNearLimit = charCount > MAX_JOB_DESCRIPTION_LENGTH * 0.9

  return (
    <div className="form-field">
      <div className="form-field__label-row">
        <label htmlFor={textareaId} className="form-field__label">
          Job description
          <span className="form-field__required" aria-hidden="true">
            *
          </span>
        </label>
        <span
          className={`form-field__count ${isNearLimit ? 'form-field__count--warn' : ''}`}
          aria-live="polite"
        >
          {charCount.toLocaleString()} / {MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()}
        </span>
      </div>

      <textarea
        id={textareaId}
        className={`textarea ${error ? 'textarea--error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here — include responsibilities, required skills, and qualifications for the most accurate analysis."
        rows={10}
        maxLength={MAX_JOB_DESCRIPTION_LENGTH}
        aria-describedby={`${textareaId}-hint${error ? ` ${textareaId}-error` : ''}`}
        aria-invalid={Boolean(error)}
      />

      <p id={`${textareaId}-hint`} className="form-field__hint">
        Minimum {MIN_JOB_DESCRIPTION_LENGTH} characters required
      </p>

      {error && (
        <p id={`${textareaId}-error`} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
