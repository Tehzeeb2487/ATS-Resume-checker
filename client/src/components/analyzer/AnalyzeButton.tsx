import { ArrowRightIcon } from '../ui/Icons'

interface AnalyzeButtonProps {
  disabled: boolean
  isLoading?: boolean
  onClick: () => void
}

export function AnalyzeButton({ disabled, isLoading, onClick }: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      className="btn btn--gradient btn--lg analyze-btn"
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
    >
      <span>{isLoading ? 'Analyzing…' : 'Analyze Resume'}</span>
      {!isLoading && <ArrowRightIcon size={18} />}
    </button>
  )
}

