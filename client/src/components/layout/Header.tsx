import { DocumentIcon } from '../ui/Icons'

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__brand" aria-label="ATS Resume Checker home">
          <span className="header__logo" aria-hidden="true">
            <DocumentIcon size={22} />
          </span>
          <span className="header__title">
            <span className="header__name">Resume Analyzer</span>
            <span className="header__tagline">ATS-style analysis</span>
          </span>
        </a>
      </div>
    </header>
  )
}
