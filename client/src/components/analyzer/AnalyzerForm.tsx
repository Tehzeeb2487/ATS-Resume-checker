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
      <h2 id="analyzer-heading" className="analyzer-form__heading">
        Start your analysis
      </h2>
      <p className="analyzer-form__subheading">
        Upload your resume and paste the target job description below.
      </p>

      {analysisError && (
        <ErrorAlert message={analysisError} onDismiss={onDismissError} />
      )}

      <div className="analyzer-form__grid">
        <ResumeUploader
          file={resume}
          onFileChange={onResumeChange}
          error={resumeError}
        />
        <JobDescriptionInput
          value={jobDescription}
          onChange={onJobDescriptionChange}
          error={jobError}
        />
      </div>

      <div className="analyzer-form__actions">
        <AnalyzeButton disabled={!canAnalyze} onClick={onAnalyze} />
        {!canAnalyze && (
          <p className="analyzer-form__hint">
            Upload a resume and paste a job description to enable analysis.
          </p>
        )}
      </div>
    </section>
  )
}
