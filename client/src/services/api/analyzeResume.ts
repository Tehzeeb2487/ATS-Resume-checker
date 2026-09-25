import type {
  AnalysisResult,
  AnalyzeResumeRequest,
  ProgressCallback,
  RawBackendResponse,
} from '../../types/analysis'

import { ANALYSIS_STAGE_DEFINITIONS } from '../../constants/analysisStages'
import { getScoreInterpretation } from '../../utils/getScoreInterpretation'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

function normalizeBackendResponse(
  raw: RawBackendResponse
): AnalysisResult {
  const score = Math.min(
    100,
    Math.max(0, raw.atsScore ?? raw.score ?? 0)
  )

  const interpretation =
    raw.interpretation ?? getScoreInterpretation(score)

  /*
   * Backend jobMatch:
   *
   * skills
   * keywords
   * experience
   * projects
   * education
   */

  const metrics = {
    overallMatch: score,

    keywordMatch:
      raw.jobMatch?.keywords ??
      raw.metrics?.keywordMatch ??
      0,

    skillsMatch:
      raw.jobMatch?.skills ??
      raw.metrics?.skillsMatch ??
      0,

    experienceRelevance:
      raw.jobMatch?.experience ??
      raw.metrics?.experienceRelevance ??
      0,
  }

  /*
   * Matched skills from backend
   */
  const matchedKeywords =
    raw.matchedSkills ??
    raw.matchedKeywords ??
    []

  /*
   * Missing keywords from backend
   */
  const missingKeywords =
    raw.missingKeywords ??
    []

  /*
   * Suggestions from backend
   */
  const suggestions = (raw.suggestions ?? []).map(
    (suggestion, index) => ({
      id: suggestion.id ?? String(index + 1),

      title:
        suggestion.title ??
        'Improvement Opportunity',

      description:
        suggestion.description ??
        '',

      priority:
        suggestion.priority ??
        'medium',
    })
  )

  /*
   * Job description matching
   * Uses REAL backend values.
   */
  const jobDescriptionMatching = [
    {
      id: 'skills',
      label: 'Skills',
      score: raw.jobMatch?.skills ?? 0,
      summary:
        'Skills alignment based on the resume and job description.',
    },

    {
      id: 'keywords',
      label: 'Keywords',
      score: raw.jobMatch?.keywords ?? 0,
      summary:
        'Keyword match against the job description.',
    },

    {
      id: 'experience',
      label: 'Experience',
      score: raw.jobMatch?.experience ?? 0,
      summary:
        'Experience relevance compared with the job requirements.',
    },

    {
      id: 'projects',
      label: 'Projects',
      score: raw.jobMatch?.projects ?? 0,
      summary:
        'Project alignment with the job requirements.',
    },

    {
      id: 'education',
      label: 'Education',
      score: raw.jobMatch?.education ?? 0,
      summary:
        'Education compatibility with the job requirements.',
    },
  ]

  /*
   * Quality checks are NOT returned by backend yet.
   *
   * We will add real backend quality checks later.
   * For now these are UI-level placeholders so the
   * existing ResultsDashboard does not break.
   */
  const qualityChecks = [
    {
      id: 'contact',
      label: 'Resume uploaded successfully',
      status: 'pass' as const,
    },

    {
      id: 'pdf',
      label: 'Resume text extracted successfully',
      status: 'pass' as const,
    },

    {
      id: 'analysis',
      label: 'AI analysis completed',
      status: 'pass' as const,
    },
  ]

  return {
    score,

    interpretation,

    metrics,

    matchedKeywords,

    missingKeywords,

    suggestions,

    jobDescriptionMatching,

    qualityChecks,

    analyzedAt:
      raw.analyzedAt ??
      new Date().toISOString(),

    isDemo: false,
  }
}

export async function analyzeResume(
  fileOrRequest: File | AnalyzeResumeRequest,
  jobDescOrProgress?: string | ProgressCallback,
  onProgressArg?: ProgressCallback | AbortSignal,
  signalArg?: AbortSignal
): Promise<AnalysisResult> {

  let file: File
  let jobDescription: string
  let onProgress: ProgressCallback | undefined
  let signal: AbortSignal | undefined

  /*
   * Support:
   *
   * analyzeResume(file, jobDescription)
   *
   * OR
   *
   * analyzeResume(
   *   { resume, jobDescription },
   *   onProgress,
   *   signal
   * )
   */

  if (fileOrRequest instanceof File) {

    file = fileOrRequest

    jobDescription =
      (jobDescOrProgress as string) || ''

    onProgress =
      typeof onProgressArg === 'function'
        ? onProgressArg
        : undefined

    signal =
      signalArg ||
      (
        onProgressArg instanceof AbortSignal
          ? onProgressArg
          : undefined
      )

  } else {

    file = fileOrRequest.resume

    jobDescription =
      fileOrRequest.jobDescription

    onProgress =
      typeof jobDescOrProgress === 'function'
        ? jobDescOrProgress
        : undefined

    signal =
      onProgressArg instanceof AbortSignal
        ? onProgressArg
        : signalArg
  }

  /*
   * Rotate through neutral UI status messages while the real backend request
   * is in flight.
   *
   * We do NOT claim to know backend progress percentages or completion ratios.
   * Stages transition naturally through status messages and stop at
   * "Finalizing your results..." with the active loader continuously moving
   * until the real API response resolves.
   */
  let progressIntervalId: ReturnType<typeof setInterval> | undefined

  if (onProgress) {
    let stageIndex = 0
    const totalStages = ANALYSIS_STAGE_DEFINITIONS.length

    const emitCurrentStage = () => {
      onProgress!({
        percent: 0,
        stages: ANALYSIS_STAGE_DEFINITIONS.map((s, i) => ({
          ...s,
          status:
            i < stageIndex
              ? 'complete'
              : i === stageIndex
              ? 'active'
              : 'pending',
        })),
        currentMessage: ANALYSIS_STAGE_DEFINITIONS[stageIndex].label,
      })
    }

    // Emit initial status message immediately
    emitCurrentStage()

    // Transition smoothly through the status messages, remaining on the final stage
    progressIntervalId = setInterval(() => {
      if (stageIndex < totalStages - 1) {
        stageIndex++
        emitCurrentStage()
      } else {
        // Reached final stage ("Finalizing your results..."), keep active until backend responds
        if (progressIntervalId !== undefined) {
          clearInterval(progressIntervalId)
          progressIntervalId = undefined
        }
      }
    }, 2400)
  }

  try {

    const formData = new FormData()

    formData.append(
      'resume',
      file
    )

    formData.append(
      'jobDescription',
      jobDescription
    )

    const endpoint =
      `${API_BASE}/api/analyze`

    const response = await fetch(
      endpoint,
      {
        method: 'POST',
        body: formData,
        signal,
      }
    )

    /*
     * Read JSON ONLY ONCE
     */
    const responseJson =
      await response.json()

    if (!response.ok) {

      throw new Error(
        responseJson?.message ||
        'Server analysis failed. Please try again.'
      )
    }

    /*
     * Backend returns:
     *
     * {
     *   success: true,
     *   message: "...",
     *   data: {...}
     * }
     *
     * So we need the data object.
     */
    if (!responseJson.success) {

      throw new Error(
        responseJson.message ||
        'Resume analysis failed.'
      )
    }

    /*
     * IMPORTANT:
     * Backend data contains atsScore,
     * matchedSkills, jobMatch, suggestions etc.
     */
    const rawData =
      responseJson.data as RawBackendResponse

    if (onProgress) {
      onProgress({
        percent: 100,
        stages: ANALYSIS_STAGE_DEFINITIONS.map((s) => ({
          ...s,
          status: 'complete',
        })),
        currentMessage: 'Analysis complete!',
      })
    }

    return normalizeBackendResponse(
      rawData
    )

  } catch (err) {

    if (
      err instanceof DOMException &&
      err.name === 'AbortError'
    ) {
      throw err
    }

    const message =
      err instanceof Error
        ? err.message
        : 'Unable to connect to backend server. Please try again.'

    throw new Error(message)

  } finally {

    /*
     * Always clear the indeterminate progress interval
     * regardless of success or failure.
     */
    if (progressIntervalId !== undefined) {
      clearInterval(progressIntervalId)
    }
  }
}