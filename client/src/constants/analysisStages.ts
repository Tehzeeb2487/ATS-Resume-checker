import type { AnalysisStage } from '../types/analysis'

export const ANALYSIS_STAGE_DEFINITIONS: Omit<AnalysisStage, 'status'>[] = [
  { id: 'reading_resume', label: 'Analyzing your resume...' },
  { id: 'extracting_info', label: 'Comparing your resume with the job description...' },
  { id: 'matching_keywords', label: 'Evaluating skills and keywords...' },
  { id: 'finalizing', label: 'Finalizing your results...' },
]

export function createInitialStages(): AnalysisStage[] {
  return ANALYSIS_STAGE_DEFINITIONS.map((stage, index) => ({
    ...stage,
    status: index === 0 ? 'active' : 'pending',
  }))
}

