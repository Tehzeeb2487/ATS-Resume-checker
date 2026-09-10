import type {
  AnalysisResult,
  AnalyzeResumeRequest,
  ProgressCallback,
} from '../../types/analysis'
import { getDemoAnalysisResult } from '../mock/demoAnalysisResult'
import { runMockAnalysisProgress } from '../mock/mockAnalysisProgress'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false'

/**
 * POST /api/analyze-resume
 *
 * Future backend integration point. When the API is available, set
 * VITE_USE_MOCK_API=false and VITE_API_BASE_URL to your server origin.
 */
export async function analyzeResume(
  request: AnalyzeResumeRequest,
  onProgress: ProgressCallback,
  signal?: AbortSignal,
): Promise<AnalysisResult> {
  if (USE_MOCK || !API_BASE) {
    await runMockAnalysisProgress(onProgress, signal)
    // Demo UI data — not derived from the uploaded resume or job description.
    return getDemoAnalysisResult()
  }

  const formData = new FormData()
  formData.append('resume', request.resume)
  formData.append('jobDescription', request.jobDescription)

  const response = await fetch(`${API_BASE}/api/analyze-resume`, {
    method: 'POST',
    body: formData,
    signal,
  })

  if (!response.ok) {
    const message =
      (await response.json().catch(() => null))?.message ??
      'Analysis failed. Please try again.'
    throw new Error(message)
  }

  const result = (await response.json()) as AnalysisResult
  return result
}
