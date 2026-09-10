export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-section__badge">AI Resume Analyzer</div>
      <h1 id="hero-heading" className="hero-section__title">
        Analyze your resume against any job description
      </h1>
      <p className="hero-section__description">
        Get ATS-style keyword matching, identify missing skills, surface resume
        weaknesses, and discover actionable improvements — all tailored to the role
        you&apos;re targeting.
      </p>
      <ul className="hero-section__features">
        <li>Keyword &amp; skills alignment</li>
        <li>Missing keyword detection</li>
        <li>Resume quality checks</li>
        <li>Actionable recommendations</li>
      </ul>
    </section>
  )
}
