import type { AnalysisResult } from '../../types/analysis'
import { getScoreInterpretation } from '../../utils/getScoreInterpretation'

/**
 * Demo analysis payload for UI development only.
 * Replace with real API response mapping when backend is connected.
 */
export function getDemoAnalysisResult(): AnalysisResult {
  const score = 72

  return {
    score,
    interpretation: getScoreInterpretation(score),
    isDemo: true,
    analyzedAt: new Date().toISOString(),
    metrics: {
      overallMatch: 72,
      keywordMatch: 68,
      skillsMatch: 75,
      experienceRelevance: 70,
    },
    matchedKeywords: [
      'React',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Git',
      'Agile',
      'JavaScript',
      'HTML/CSS',
    ],
    missingKeywords: [
      'Docker',
      'AWS',
      'PostgreSQL',
      'CI/CD',
      'Microservices',
    ],
    suggestions: [
      {
        id: '1',
        title: 'Add measurable results to project descriptions',
        description:
          'Quantify impact with metrics such as performance improvements, user growth, or delivery timelines to strengthen credibility.',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Mention relevant technologies explicitly',
        description:
          'The job description references Docker and cloud platforms. Include these where applicable in your skills and experience sections.',
        priority: 'high',
      },
      {
        id: '3',
        title: 'Improve keyword alignment with the job description',
        description:
          'Mirror terminology from the posting (e.g., "cross-functional collaboration", "scalable systems") where it accurately reflects your experience.',
        priority: 'medium',
      },
      {
        id: '4',
        title: 'Strengthen experience descriptions',
        description:
          'Lead bullet points with action verbs and tie each role to outcomes that match the responsibilities listed in the job description.',
        priority: 'medium',
      },
      {
        id: '5',
        title: 'Remove unnecessary information',
        description:
          'Trim outdated skills or unrelated roles to keep the resume focused on requirements for this position.',
        priority: 'low',
      },
    ],
    jobDescriptionMatching: [
      {
        id: 'skills',
        label: 'Skills',
        score: 75,
        summary: 'Core frontend and backend skills align well with requirements.',
      },
      {
        id: 'experience',
        label: 'Experience',
        score: 70,
        summary: 'Relevant project experience present; cloud exposure could be stronger.',
      },
      {
        id: 'education',
        label: 'Education',
        score: 85,
        summary: 'Educational background meets typical expectations for this role.',
      },
      {
        id: 'keywords',
        label: 'Keywords',
        score: 68,
        summary: 'Several important keywords from the job description are missing.',
      },
      {
        id: 'projects',
        label: 'Projects',
        score: 72,
        summary: 'Projects demonstrate relevant stack usage; add deployment details.',
      },
    ],
    qualityChecks: [
      {
        id: 'contact',
        label: 'Contact information detected',
        status: 'pass',
      },
      {
        id: 'skills_section',
        label: 'Skills section detected',
        status: 'pass',
      },
      {
        id: 'experience_section',
        label: 'Experience section detected',
        status: 'pass',
      },
      {
        id: 'projects_section',
        label: 'Projects section detected',
        status: 'pass',
      },
      {
        id: 'formatting',
        label: 'Section formatting',
        status: 'warning',
        detail: 'Some sections may need clearer headings for ATS parsing.',
      },
    ],
  }
}
