import { ANALYSIS_STAGE_DEFINITIONS } from '../../constants/analysisStages'
import type { AnalysisProgress, AnalysisStage, ProgressCallback } from '../../types/analysis'

const STAGE_DURATIONS_MS = [800, 900, 1000, 1100, 900, 1000, 700]

function buildProgress(completedCount: number, activeIndex: number, percent: number): AnalysisProgress {
  const stages: AnalysisStage[] = ANALYSIS_STAGE_DEFINITIONS.map((stage, index) => {
    if (index < completedCount) {
      return { ...stage, status: 'complete' }
    }
    if (index === activeIndex) {
      return { ...stage, status: 'active' }
    }
    return { ...stage, status: 'pending' }
  })

  const activeStage = stages[activeIndex]

  return {
    percent,
    stages,
    currentMessage: activeStage?.label ?? 'Analyzing your resume',
  }
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Analysis cancelled', 'AbortError'))
      return
    }

    const timer = window.setTimeout(resolve, ms)

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer)
        reject(new DOMException('Analysis cancelled', 'AbortError'))
      },
      { once: true },
    )
  })
}

/**
 * Simulates analysis progress for UI demonstration.
 * The real backend should drive progress via polling or streaming.
 */
export async function runMockAnalysisProgress(
  onProgress: ProgressCallback,
  signal?: AbortSignal,
): Promise<void> {
  const totalDuration = STAGE_DURATIONS_MS.reduce((sum, ms) => sum + ms, 0)
  let elapsed = 0

  for (let i = 0; i < ANALYSIS_STAGE_DEFINITIONS.length; i++) {
    const stageDuration = STAGE_DURATIONS_MS[i]
    const steps = 4
    const stepDuration = stageDuration / steps

    for (let step = 0; step < steps; step++) {
      await delay(stepDuration, signal)
      elapsed += stepDuration
      const percent = Math.min(99, Math.round((elapsed / totalDuration) * 100))
      onProgress(buildProgress(i, i, percent))
    }

    onProgress(buildProgress(i + 1, Math.min(i + 1, ANALYSIS_STAGE_DEFINITIONS.length - 1), Math.min(99, Math.round((elapsed / totalDuration) * 100))))
  }

  onProgress({
    percent: 100,
    stages: ANALYSIS_STAGE_DEFINITIONS.map((stage) => ({ ...stage, status: 'complete' })),
    currentMessage: 'Analysis complete',
  })
}
