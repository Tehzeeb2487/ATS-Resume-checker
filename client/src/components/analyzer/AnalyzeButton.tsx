interface AnalyzeButtonProps {
  disabled: boolean
  isLoading?: boolean
  onClick: () => void
}

export function AnalyzeButton({ disabled, isLoading, onClick }: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      className="btn btn--primary btn--lg analyze-btn"
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
    >
      {isLoading ? 'Analyzing…' : 'Analyze Resume'}
    </button>
  )
}
