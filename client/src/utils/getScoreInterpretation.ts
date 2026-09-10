export function getScoreInterpretation(score: number): string {
  if (score >= 85) {
    return 'Strong match — your resume aligns well with this role.'
  }
  if (score >= 70) {
    return 'Good match — a few targeted improvements could strengthen your application.'
  }
  if (score >= 55) {
    return 'Moderate match — consider addressing key gaps highlighted below.'
  }
  if (score >= 40) {
    return 'Partial match — significant keyword and experience gaps were detected.'
  }
  return 'Low match — substantial revisions are recommended for this role.'
}
