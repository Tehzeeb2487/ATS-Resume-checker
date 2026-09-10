import type { ValidationError } from '../../utils/validateInputs'
import { AnalyzeButton } from './AnalyzeButton'
import { ErrorAlert } from './ErrorAlert'
import { JobDescriptionInput } from './JobDescriptionInput'
import { ResumeUploader } from './ResumeUploader'

interface AnalyzerFormProps {
  resume: File | null
  jobDescription: string
  canAnalyze: boolean
  validationError: ValidationError | null
  analysisError: string | null
  onResumeChange: (file: File | null) => void
  onJobDescriptionChange: (text: string) => void
  onAnalyze: () => void
  onDismissError: () => void
}

export function AnalyzerForm({
  resume,
  jobDescription,
  canAnalyze,
  validationError,
  analysisError,
  onResumeChange,
  onJobDescriptionChange,
  onAnalyze,
  onDismissError,
}: AnalyzerFormProps) {
  const resumeError =
    validationError?.field === 'resume' ? validationError.message : null
  const jobError =
    validationError?.field === 'jobDescription' ? validationError.message : null

  return (
    <section className="analyzer-form" aria-labelledby="analyzer-heading">
      <h2 id="analyzer-heading" className="sr-only">
        Resume &amp; Job Description Analyzer
      </h2>

      {analysisError && (
        <ErrorAlert message={analysisError} onDismiss={onDismissError} />
      )}

      <div className="analyzer-form__grid">
        <div className="analyzer-form__col">
          <div className="analyzer-form__step-label">
            <span className="step-num">1</span>
            <span>Upload Resume</span>
          </div>
          <ResumeUploader
            file={resume}
            onFileChange={onResumeChange}
            error={resumeError}
          />
        </div>

        <div className="analyzer-form__col">
          <div className="analyzer-form__step-label">
            <span className="step-num">2</span>
            <span>Paste Job Description</span>
          </div>
          <JobDescriptionInput
            value={jobDescription}
            onChange={onJobDescriptionChange}
            error={jobError}
          />
        </div>
      </div>

      <div className="analyzer-form__actions">
        {!canAnalyze && (
          <p className="analyzer-form__hint">
            Upload your resume and paste a job description (min 50 characters) to analyze.
          </p>
        )}
        <AnalyzeButton disabled={!canAnalyze} onClick={onAnalyze} />
      </div>
    </section>
  )
}

