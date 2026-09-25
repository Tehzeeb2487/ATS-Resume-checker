export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          <strong>ATS Resume Checker</strong> — AI-Powered Resume Analysis &amp;
          Job Description Matching.
        </p>

        <p className="footer__text">
          Scores reflect keyword and content alignment suggestions for modern
          ATS systems.
        </p>

        <p className="footer__text">
          <strong><b>© {new Date().getFullYear()} Tehzeeb Jahan. All rights reserved.</b></strong>
        </p>
      </div>
    </footer>
  )
}
