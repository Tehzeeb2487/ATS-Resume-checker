import { useCallback, useRef, useState } from 'react'
import { createInitialStages } from '../constants/analysisStages'
import { analyzeResume } from '../services/api/analyzeResume'
import type { AnalysisProgress, AnalysisResult, AppView } from '../types/analysis'
import { validateAnalysisInputs } from '../utils/validateInputs'
import type { ValidationError } from '../utils/validateInputs'

interface UseResumeAnalysisReturn {
  view: AppView
  resume: File | null
  jobDescription: string
  validationError: ValidationError | null
  analysisError: string | null
  progress: AnalysisProgress
  result: AnalysisResult | null
  setResume: (file: File | null) => void
  setJobDescription: (text: string) => void
  clearValidationError: () => void
  startAnalysis: () => Promise<void>
  resetAnalysis: () => void
  analyzeAnother: () => void
  canAnalyze: boolean
}

function createInitialProgress(): AnalysisProgress {
  return {
    percent: 0,
    stages: createInitialStages(),
    currentMessage: 'Preparing analysis',
  }
}

export function useResumeAnalysis(): UseResumeAnalysisReturn {
  const [view, setView] = useState<AppView>('analyzer')
  const [resume, setResumeState] = useState<File | null>(null)
  const [jobDescription, setJobDescriptionState] = useState('')
  const [validationError, setValidationError] = useState<ValidationError | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [progress, setProgress] = useState<AnalysisProgress>(createInitialProgress)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const canAnalyze = Boolean(resume) && jobDescription.trim().length >= 50

  const setResume = useCallback((file: File | null) => {
    setResumeState(file)
    setValidationError(null)
    setAnalysisError(null)
  }, [])

  const setJobDescription = useCallback((text: string) => {
    setJobDescriptionState(text)
    setValidationError(null)
    setAnalysisError(null)
  }, [])

  const clearValidationError = useCallback(() => {
    setValidationError(null)
  }, [])

  const startAnalysis = useCallback(async () => {
    const error = validateAnalysisInputs(resume, jobDescription)
    if (error) {
      setValidationError(error)
      return
    }

    if (!resume) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setValidationError(null)
    setAnalysisError(null)
    setResult(null)
    setProgress(createInitialProgress())
    setView('analyzing')

    try {
      const analysisResult = await analyzeResume(
        { resume, jobDescription: jobDescription.trim() },
        setProgress,
        controller.signal,
      )
      setResult(analysisResult)
      setView('results')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }
      const message =
        err instanceof Error ? err.message : 'Something went wrong during analysis.'
      setAnalysisError(message)
      setView('analyzer')
    }
  }, [resume, jobDescription])

  const resetAnalysis = useCallback(() => {
    abortRef.current?.abort()
    setResumeState(null)
    setJobDescriptionState('')
    setValidationError(null)
    setAnalysisError(null)
    setResult(null)
    setProgress(createInitialProgress())
    setView('analyzer')
  }, [])

  const analyzeAnother = useCallback(() => {
    abortRef.current?.abort()
    setResumeState(null)
    setValidationError(null)
    setAnalysisError(null)
    setResult(null)
    setProgress(createInitialProgress())
    setView('analyzer')
  }, [])

  return {
    view,
    resume,
    jobDescription,
    validationError,
    analysisError,
    progress,
    result,
    setResume,
    setJobDescription,
    clearValidationError,
    startAnalysis,
    resetAnalysis,
    analyzeAnother,
    canAnalyze,
  }
}
