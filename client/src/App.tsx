import { AnalysisProgress } from './components/analysis/AnalysisProgress'
import { AnalyzerForm } from './components/analyzer/AnalyzerForm'
import { HeroSection } from './components/analyzer/HeroSection'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ResultsDashboard } from './components/results/ResultsDashboard'
import { useResumeAnalysis } from './hooks/useResumeAnalysis'

function App() {
  const {
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
  } = useResumeAnalysis()

  return (
    <div className="app">
      <Header />

      <main className="main">
        {view === 'analyzer' && (
          <>
            <HeroSection />
            <AnalyzerForm
              resume={resume}
              jobDescription={jobDescription}
              canAnalyze={canAnalyze}
              validationError={validationError}
              analysisError={analysisError}
              onResumeChange={setResume}
              onJobDescriptionChange={setJobDescription}
              onAnalyze={startAnalysis}
              onDismissError={clearValidationError}
            />
          </>
        )}

        {view === 'analyzing' && <AnalysisProgress progress={progress} />}

        {view === 'results' && result && (
          <ResultsDashboard
            result={result}
            onAnalyzeAnother={analyzeAnother}
            onStartNew={resetAnalysis}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
