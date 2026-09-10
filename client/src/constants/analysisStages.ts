import type { AnalysisStage } from '../types/analysis'

export const ANALYSIS_STAGE_DEFINITIONS: Omit<AnalysisStage, 'status'>[] = [
  { id: 'reading_resume', label: 'Reading resume' },
  { id: 'extracting_info', label: 'Extracting resume information' },
  { id: 'comparing_jd', label: 'Comparing with job description' },
  { id: 'matching_keywords', label: 'Matching keywords and skills' },
  { id: 'identifying_missing', label: 'Identifying missing keywords' },
  { id: 'generating_recommendations', label: 'Generating recommendations' },
  { id: 'finalizing', label: 'Finalizing analysis' },
]

export function createInitialStages(): AnalysisStage[] {
  return ANALYSIS_STAGE_DEFINITIONS.map((stage, index) => ({
    ...stage,
    status: index === 0 ? 'active' : 'pending',
  }))
}
