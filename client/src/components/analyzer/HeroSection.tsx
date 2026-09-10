import {
  DocumentIcon,
  LightbulbIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
} from '../ui/Icons'

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-section__container">
        <div className="hero-section__content">
          <div className="hero-section__badge">
            <SparklesIcon size={14} className="hero-section__badge-icon" />
            <span>AI-Powered Resume Analysis</span>
          </div>

          <h1 id="hero-heading" className="hero-section__title">
            Analyze your resume against{' '}
            <span className="text-highlight">any</span> job description.
          </h1>

          <p className="hero-section__description">
            Get detailed ATS-style insights, identify missing skills, find
            improvement opportunities and increase your chances of getting hired.
          </p>

          <ul className="hero-section__pills">
            <li className="hero-pill">
              <div className="hero-pill__icon">
                <SearchIcon size={16} />
              </div>
              <div className="hero-pill__text">
                <strong>Keyword Matching</strong>
                <span>Find relevant skills &amp; keywords</span>
              </div>
            </li>

            <li className="hero-pill">
              <div className="hero-pill__icon">
                <TargetIcon size={16} />
              </div>
              <div className="hero-pill__text">
                <strong>Gap Analysis</strong>
                <span>See what&apos;s missing</span>
              </div>
            </li>

            <li className="hero-pill">
              <div className="hero-pill__icon">
                <LightbulbIcon size={16} />
              </div>
              <div className="hero-pill__text">
                <strong>Actionable Suggestions</strong>
                <span>Improve your resume</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="hero-section__visual" aria-hidden="true">
          <div className="hero-visual">
            <div className="hero-visual__glow" />

            {/* Mock Resume Card */}
            <div className="hero-visual__card hero-visual__card--resume">
              <div className="hero-visual__card-header">
                <DocumentIcon size={18} className="hero-visual__doc-icon" />
                <div>
                  <div className="hero-visual__file-name">Resume.pdf</div>
                  <div className="hero-visual__file-sub">Frontend Developer</div>
                </div>
                <span className="hero-visual__badge-pdf">PDF</span>
              </div>
              <div className="hero-visual__skeleton">
                <div className="skeleton-line skeleton-line--title" />
                <div className="skeleton-line skeleton-line--w80" />
                <div className="skeleton-line skeleton-line--w60" />
                <div className="skeleton-line skeleton-line--w90" />
              </div>
            </div>

            {/* Mock Job Description Card */}
            <div className="hero-visual__card hero-visual__card--jd">
              <div className="hero-visual__card-title">Job Description</div>
              <div className="hero-visual__skeleton">
                <div className="skeleton-line skeleton-line--w90" />
                <div className="skeleton-line skeleton-line--w70" />
                <div className="skeleton-line skeleton-line--w85" />
              </div>
            </div>

            {/* Mock Score Floating Badge */}
            <div className="hero-visual__card hero-visual__card--score">
              <div className="hero-score-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="url(#hero-ring-grad)"
                    strokeWidth="5"
                    strokeDasharray="150"
                    strokeDashoffset="33"
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient id="hero-ring-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="hero-score-val">
                  <span className="hero-score-num">78</span>
                  <span className="hero-score-max">/100</span>
                </div>
              </div>
              <div className="hero-score-meta">
                <span className="hero-score-label">ATS Score</span>
                <span className="hero-score-trend">
                  <TrendingUpIcon size={14} /> +12%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

