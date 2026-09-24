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
  analysisId?: string
  resumeFileName?: string
  atsScore?: number

  matchedSkills?: string[]
  matchedKeywords?: string[]
  missingKeywords?: string[]

  jobMatch?: {
    skills?: number
    keywords?: number
    experience?: number
    projects?: number
    education?: number
  }

  score?: number

  interpretation?: string

  suggestions?: Array<{
    id?: string
    title?: string
    priority?:
    | 'high'
    | 'medium'
    | 'low'
    | 'High'
    | 'Medium'
    | 'Low'
    description?: string
  }>

  qualityChecks?: Array<{
    id: string
    label: string
    status: 'pass' | 'warning' | 'fail'
    detail?: string
  }>

  analyzedAt?: string

  metrics?: {
    overallMatch?: number
    keywordMatch?: number
    skillsMatch?: number
    experienceRelevance?: number
  }

  categoryScores?: {
    Overall?: number
    Keywords?: number
    Skills?: number
    Experience?: number
    Projects?: number
    Education?: number
  }
}

export type ProgressCallback = (progress: AnalysisProgress) => void

