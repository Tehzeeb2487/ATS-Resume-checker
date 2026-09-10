import { useId } from 'react'
import { MAX_JOB_DESCRIPTION_LENGTH } from '../../constants/validation'

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
      <div className="textarea-wrapper">
        <textarea
          id={textareaId}
          className={`textarea ${error ? 'textarea--error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here..."
          rows={8}
          maxLength={MAX_JOB_DESCRIPTION_LENGTH}
          aria-describedby={`${textareaId}-hint${error ? ` ${textareaId}-error` : ''}`}
          aria-invalid={Boolean(error)}
        />
        <div className="textarea-footer">
          <span
            className={`form-field__count ${isNearLimit ? 'form-field__count--warn' : ''}`}
            aria-live="polite"
          >
            {charCount} / {MAX_JOB_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      {error && (
        <p id={`${textareaId}-error`} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

