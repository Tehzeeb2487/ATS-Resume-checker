import { AlertIcon, XIcon } from '../ui/Icons'

interface ErrorAlertProps {
  message: string
  onDismiss?: () => void
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="error-alert" role="alert">
      <AlertIcon className="error-alert__icon" />
      <p className="error-alert__message">{message}</p>
      {onDismiss && (
        <button
          type="button"
          className="error-alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  )
}
