import { useCallback, useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { toast } from 'sonner'
import { ACCEPTED_RESUME_EXTENSIONS } from '../../constants/validation'
import { formatFileSize } from '../../utils/formatFileSize'
import { validateResumeFile } from '../../utils/validateInputs'
import { FileIcon, UploadIcon, XIcon } from '../ui/Icons'

interface ResumeUploaderProps {
  file: File | null
  onFileChange: (file: File | null) => void
  error?: string | null
}

export function ResumeUploader({ file, onFileChange, error }: ResumeUploaderProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const accept = ACCEPTED_RESUME_EXTENSIONS.join(',')

  const handleFile = useCallback(
    (selected: File | null) => {
      if (!selected) return

      const validationError = validateResumeFile(selected)
      if (validationError) {
        setLocalError(validationError.message)
        toast.error(validationError.message)
        onFileChange(null)
        return
      }

      setLocalError(null)
      onFileChange(selected)
    },
    [onFileChange],
  )

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null
    handleFile(selected)
    event.target.value = ''
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const dropped = event.dataTransfer.files[0] ?? null
    handleFile(dropped)
  }

  const displayError = error ?? localError

  return (
    <div className="form-field">
      <div
        className={`upload-zone ${file ? 'upload-zone--selected' : ''} ${
          isDragging ? 'upload-zone--dragging' : ''
        } ${displayError ? 'upload-zone--error' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="upload-zone__input"
          accept={accept}
          onChange={onInputChange}
          aria-describedby={displayError ? `${inputId}-error` : `${inputId}-hint`}
          aria-invalid={Boolean(displayError)}
        />

        {file ? (
          <div className="upload-zone__file">
            <div className="upload-zone__file-icon" aria-hidden="true">
              <FileIcon size={26} />
            </div>
            <div className="upload-zone__file-info">
              <p className="upload-zone__filename">{file.name}</p>
              <p className="upload-zone__filesize">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              className="upload-zone__remove"
              onClick={() => {
                onFileChange(null)
                setLocalError(null)
              }}
              aria-label={`Remove ${file.name}`}
              title="Remove file"
            >
              <XIcon size={16} />
            </button>
          </div>
        ) : (
          <div className="upload-zone__empty">
            <div className="upload-zone__icon-wrapper" aria-hidden="true">
              <UploadIcon size={24} />
            </div>
            <p className="upload-zone__text">
              Drag &amp; drop your resume here
            </p>
            <p className="upload-zone__or">or</p>
            <button
              type="button"
              className="upload-zone__browse-btn"
              onClick={() => inputRef.current?.click()}
            >
              Browse File
            </button>
            <p id={`${inputId}-hint`} className="upload-zone__hint">
              Supported: PDF, DOCX (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {displayError && (
        <p id={`${inputId}-error`} className="form-field__error" role="alert">
          {displayError}
        </p>
      )}
    </div>
  )
}

