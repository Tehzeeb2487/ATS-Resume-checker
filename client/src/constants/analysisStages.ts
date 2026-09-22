import type { AnalysisStage } from '../types/analysis'

export const ANALYSIS_STAGE_DEFINITIONS: Omit<AnalysisStage, 'status'>[] = [
  { id: 'reading_resume', label: 'Reading resume' },
  { id: 'extracting_info', label: 'Extracting job requirements' },
  { id: 'matching_keywords', label: 'Comparing skills & keywords' },
  { id: 'finalizing', label: 'Calculating ATS score' },
]

export function createInitialStages(): AnalysisStage[] {
  return ANALYSIS_STAGE_DEFINITIONS.map((stage, index) => ({
    ...stage,
    status: index === 0 ? 'active' : 'pending',
  }))
}

