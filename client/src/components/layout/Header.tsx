import { useState } from 'react'
import { DocumentIcon, MenuIcon, UserIcon, XIcon } from '../ui/Icons'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__brand" aria-label="ATS Resume Checker home">
          <span className="header__logo" aria-hidden="true">
            <DocumentIcon size={22} />
          </span>
          <span className="header__title">
            <span className="header__name">ATS Resume Checker</span>
          </span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <a href="#home" className="header__nav-link header__nav-link--active">
            Home
          </a>
          <a href="#how-it-works" className="header__nav-link">
            How It Works
          </a>
          <a href="#features" className="header__nav-link">
            Features
          </a>
          <a href="#about" className="header__nav-link">
            About
          </a>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="header__user-btn"
            aria-label="User profile"
          >
            <UserIcon size={18} />
          </button>
          <button
            type="button"
            className="header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            <a
              href="#home"
              className="header__mobile-link header__mobile-link--active"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#how-it-works"
              className="header__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="header__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#about"
              className="header__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

