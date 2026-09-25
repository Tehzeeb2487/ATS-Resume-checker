export const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
] as const

export const ACCEPTED_RESUME_EXTENSIONS = ['.pdf'] as const

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export const MIN_JOB_DESCRIPTION_LENGTH = 50

export const MAX_JOB_DESCRIPTION_LENGTH = 10000