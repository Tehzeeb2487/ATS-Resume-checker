export type AnalysisStageId =
  | 'reading_resume'
  | 'extracting_info'
  | 'comparing_jd'
  | 'matching_keywords'
  | 'identifying_missing'
  | 'generating_recommendations'
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
  priority: 'high' | 'medium' | 'low'
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
  isDemo: boolean
}

export type AppView = 'analyzer' | 'analyzing' | 'results'

export interface AnalyzeResumeRequest {
  resume: File
  jobDescription: string
}

export interface AnalyzeResumeError {
  code: 'NETWORK' | 'SERVER' | 'TIMEOUT' | 'UNKNOWN'
  message: string
}

export type ProgressCallback = (progress: AnalysisProgress) => void
