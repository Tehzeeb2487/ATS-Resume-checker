import type {
  AnalysisResult,
  AnalyzeResumeRequest,
  ProgressCallback,
  RawBackendResponse,
} from '../../types/analysis'
import { getScoreInterpretation } from '../../utils/getScoreInterpretation'
import { getDemoAnalysisResult } from '../mock/demoAnalysisResult'
import { runMockAnalysisProgress } from '../mock/mockAnalysisProgress'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true'

/**
 * Normalizes any backend JSON response into a strict AnalysisResult object for UI rendering.
 */
function normalizeBackendResponse(raw: RawBackendResponse): AnalysisResult {
  const score = Math.min(100, Math.max(0, raw.atsScore ?? raw.score ?? 70))
  const interpretation = raw.interpretation ?? getScoreInterpretation(score)

  const metrics = {
    overallMatch: raw.metrics?.overallMatch ?? raw.categoryScores?.Overall ?? score,
    keywordMatch: raw.metrics?.keywordMatch ?? raw.categoryScores?.Keywords ?? Math.round(score * 0.9),
    skillsMatch: raw.metrics?.skillsMatch ?? raw.categoryScores?.Skills ?? Math.round(score * 0.95),
    experienceRelevance:
      raw.metrics?.experienceRelevance ?? raw.categoryScores?.Experience ?? Math.round(score * 0.85),
  }

  const matchedKeywords = raw.matchedSkills ?? raw.matchedKeywords ?? []
  const missingKeywords = raw.missingKeywords ?? []

  const suggestions = (raw.suggestions ?? []).map((s, idx) => ({
    id: s.id || String(idx + 1),
    title: s.title || 'Improvement Opportunity',
    description: s.description || '',
    priority: s.priority || 'Medium',
  }))

  const jobDescriptionMatching = raw.jobDescriptionMatching ?? [
    {
      id: 'skills',
      label: 'Skills',
      score: raw.categoryScores?.Skills ?? metrics.skillsMatch,
      summary: 'Skills alignment based on resume content.',
    },
    {
      id: 'experience',
      label: 'Experience',
      score: raw.categoryScores?.Experience ?? metrics.experienceRelevance,
      summary: 'Experience relevance compared to requirements.',
    },
    {
      id: 'education',
      label: 'Education',
      score: raw.categoryScores?.Education ?? 80,
      summary: 'Educational background compatibility.',
    },
    {
      id: 'keywords',
      label: 'Keywords',
      score: raw.categoryScores?.Keywords ?? metrics.keywordMatch,
      summary: 'Keyword density and terminology match.',
    },
    {
      id: 'projects',
      label: 'Projects',
      score: raw.categoryScores?.Projects ?? 75,
      summary: 'Project technical alignment.',
    },
  ]

  const qualityChecks = raw.qualityChecks ?? [
    { id: 'contact', label: 'Contact information detected', status: 'pass' },
    { id: 'skills_sec', label: 'Skills section detected', status: 'pass' },
    { id: 'exp_sec', label: 'Experience section detected', status: 'pass' },
    { id: 'proj_sec', label: 'Projects section detected', status: 'pass' },
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
    analyzedAt: raw.analyzedAt ?? new Date().toISOString(),
    isDemo: false,
  }
}

/**
 * Service function to send resume file and job description to Express backend via POST /api/analyze.
 * Accepts signature:
 * - analyzeResume(file: File, jobDescription: string, onProgress?: ProgressCallback, signal?: AbortSignal)
 * - analyzeResume({ resume: File, jobDescription: string }, onProgress?: ProgressCallback, signal?: AbortSignal)
 */
export async function analyzeResume(
  fileOrRequest: File | AnalyzeResumeRequest,
  jobDescOrProgress?: string | ProgressCallback,
  onProgressArg?: ProgressCallback | AbortSignal,
  signalArg?: AbortSignal,
): Promise<AnalysisResult> {
  let file: File
  let jobDescription: string
  let onProgress: ProgressCallback | undefined
  let signal: AbortSignal | undefined

  if (fileOrRequest instanceof File) {
    file = fileOrRequest
    jobDescription = (jobDescOrProgress as string) || ''
    onProgress = typeof onProgressArg === 'function' ? onProgressArg : undefined
    signal = signalArg || (onProgressArg instanceof AbortSignal ? onProgressArg : undefined)
  } else {
    file = fileOrRequest.resume
    jobDescription = fileOrRequest.jobDescription
    onProgress = typeof jobDescOrProgress === 'function' ? jobDescOrProgress : undefined
    signal = onProgressArg instanceof AbortSignal ? onProgressArg : signalArg
  }


  // If mock mode is explicitly forced or API base is not configured, fall back to simulated progress & demo data
  if (USE_MOCK || (!API_BASE && !import.meta.env.PROD)) {
    if (onProgress) {
      await runMockAnalysisProgress(onProgress, signal)
    }
    return getDemoAnalysisResult()
  }

  // Simulate progress steps locally while waiting for backend HTTP response
  let progressTimer: number | null = null
  if (onProgress) {
    runMockAnalysisProgress(onProgress, signal).catch(() => {})
  }

  try {
    const formData = new FormData()
    formData.append('resume', file)
    formData.append('jobDescription', jobDescription)

    const endpoint = `${API_BASE || ''}/api/analyze`

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal,
    })

    if (!response.ok) {
      let errorMessage = 'Server analysis failed. Please try again.'
      try {
        const errorJson = await response.json()
        if (errorJson?.message) {
          errorMessage = errorJson.message
        }
      } catch {
        if (response.status === 413) {
          errorMessage = 'The uploaded PDF is too large. Please upload a smaller file.'
        } else if (response.status === 400) {
          errorMessage = 'Invalid input. Please check your file and job description.'
        }
      }
      throw new Error(errorMessage)
    }

    const rawData = (await response.json()) as RawBackendResponse
    return normalizeBackendResponse(rawData)
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err
    }
    const msg = err instanceof Error ? err.message : 'Unable to connect to backend server. Please try again.'
    throw new Error(msg)
  } finally {
    if (progressTimer) clearInterval(progressTimer)
  }
}

