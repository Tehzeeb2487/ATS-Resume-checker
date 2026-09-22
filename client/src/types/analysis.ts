export type AnalysisStageId =
  | 'reading_resume'
  | 'extracting_info'
  | 'matching_keywords'
  | 'finalizing'

export type AnalysisStageStatus = 'pending' | 'active' | 'complete'

export interface AnalysisStage {
  id: AnalysisStageId
  label: string
  status: AnalysisStageStatus
}

export interface AnalysisProgress {
  percent: number
  stages: AnalysisStage[]
  currentMessage: string
}

export interface AnalysisMetrics {
  overallMatch: number
  keywordMatch: number
  skillsMatch: number
  experienceRelevance: number
}

export interface JobDescriptionCategory {
  id: string
  label: string
  score: number
  summary: string
}

export interface ImprovementSuggestion {
  id: string
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low' | 'high' | 'medium' | 'low'
}

export interface ResumeQualityCheck {
  id: string
  label: string
  status: 'pass' | 'warning' | 'fail'
  detail?: string
}

export interface AnalysisResult {
  score: number
  interpretation: string
  metrics: AnalysisMetrics
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: ImprovementSuggestion[]
  jobDescriptionMatching: JobDescriptionCategory[]
  qualityChecks: ResumeQualityCheck[]
  analyzedAt: string
  isDemo?: boolean
}

export type AppView = 'analyzer' | 'analyzing' | 'results'

export interface AnalyzeResumeRequest {
  resume: File
  jobDescription: string
}

export interface RawBackendResponse {
  atsScore?: number
  score?: number
  interpretation?: string
  metrics?: Partial<AnalysisMetrics>
  matchedSkills?: string[]
  matchedKeywords?: string[]
  missingKeywords?: string[]
  suggestions?: ImprovementSuggestion[]
  jobDescriptionMatching?: JobDescriptionCategory[]
  categoryScores?: Record<string, number>
  qualityChecks?: ResumeQualityCheck[]
  analyzedAt?: string
}

export type ProgressCallback = (progress: AnalysisProgress) => void

