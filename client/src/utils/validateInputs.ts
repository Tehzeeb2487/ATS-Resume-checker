import {
  ACCEPTED_RESUME_EXTENSIONS,
  ACCEPTED_RESUME_TYPES,
  MAX_RESUME_SIZE_BYTES,
  MIN_JOB_DESCRIPTION_LENGTH,
  MAX_JOB_DESCRIPTION_LENGTH,
} from '../constants/validation'

export type ValidationErrorCode =
  | 'NO_RESUME'
  | 'UNSUPPORTED_TYPE'
  | 'FILE_TOO_LARGE'
  | 'EMPTY_JOB_DESCRIPTION'
  | 'JOB_DESCRIPTION_TOO_SHORT'
  | 'JOB_DESCRIPTION_TOO_LONG'

export interface ValidationError {
  code: ValidationErrorCode
  message: string
  field: 'resume' | 'jobDescription' | 'form'
}

function hasAcceptedExtension(fileName: string): boolean {
  const lower = fileName.toLowerCase()
  return ACCEPTED_RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

export function validateResumeFile(file: File | null): ValidationError | null {
  if (!file) {
    return {
      code: 'NO_RESUME',
      message: 'Please upload your resume to continue.',
      field: 'resume',
    }
  }

  const typeAccepted = ACCEPTED_RESUME_TYPES.includes(
    file.type as (typeof ACCEPTED_RESUME_TYPES)[number],
  )
  const extensionAccepted = hasAcceptedExtension(file.name)

  if (!typeAccepted && !extensionAccepted) {
    return {
      code: 'UNSUPPORTED_TYPE',
      message: 'Unsupported file type. Please upload a PDF file.',
      field: 'resume',
    }
  }

  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return {
      code: 'FILE_TOO_LARGE',
      message: 'File is too large. Maximum size is 5 MB.',
      field: 'resume',
    }
  }

  return null
}

export function validateJobDescription(text: string): ValidationError | null {
  const trimmed = text.trim()

  if (!trimmed) {
    return {
      code: 'EMPTY_JOB_DESCRIPTION',
      message: 'Please paste the job description to continue.',
      field: 'jobDescription',
    }
  }

  if (trimmed.length < MIN_JOB_DESCRIPTION_LENGTH) {
    return {
      code: 'JOB_DESCRIPTION_TOO_SHORT',
      message: `Job description is too short. Please provide at least ${MIN_JOB_DESCRIPTION_LENGTH} characters.`,
      field: 'jobDescription',
    }
  }

  if (trimmed.length > MAX_JOB_DESCRIPTION_LENGTH) {
    return {
      code: 'JOB_DESCRIPTION_TOO_LONG',
      message: `Job description exceeds the ${MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()} character limit.`,
      field: 'jobDescription',
    }
  }

  return null
}

export function validateAnalysisInputs(
  resume: File | null,
  jobDescription: string,
): ValidationError | null {
  return validateResumeFile(resume) ?? validateJobDescription(jobDescription)
}
