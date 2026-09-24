const { GoogleGenAI } = require("@google/genai");
const z = require("zod");

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const atsResultSchema = z.object({
    matchedSkills: z.array(z.string()),

    missingKeywords: z.array(z.string()),

    skillsMatch: z.number().min(0).max(100),

    keywordsMatch: z.number().min(0).max(100),

    experienceMatch: z.number().min(0).max(100),

    projectsMatch: z.number().min(0).max(100),

    educationMatch: z.number().min(0).max(100),

    suggestions: z.array(
        z.object({
            title: z.string(),
            priority: z.enum(["high", "medium", "low"]),
            description: z.string(),
        })
    ),
});

const analyzeResumeWithAI = async (resumeText, jobDescription) => {
    const prompt = `
You are an ATS resume analysis assistant.

Analyze the candidate's resume against the provided job description.

IMPORTANT RULES:

1. Only use information actually present in the resume.
2. Never invent skills, experience, education, projects,
   certifications, or achievements.
3. Identify skills explicitly present in the resume that are
   relevant to the job description.
4. Identify important job-description keywords that are missing
   or not clearly demonstrated in the resume.
5. Do not mark a keyword as missing if the resume clearly
   demonstrates the same skill using equivalent wording.
6. Evaluate experience based only on evidence in the resume.
7. Evaluate projects based only on projects actually present
   in the resume.
8. Evaluate education based only on the candidate's actual education.
9. Suggestions must be truthful and actionable.
10. Do NOT tell the candidate to claim a skill they do not have.
11. Scores must be integers from 0 to 100.
12. Do not calculate a final ATS score.
    The backend will calculate it.
13. Priority must be exactly one of:
    high, medium, low.

Return only the requested structured JSON.

RESUME:

${resumeText}

JOB DESCRIPTION:

${jobDescription}
`;

    const response = await genAI.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents: prompt,

        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {
                    matchedSkills: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },

                    missingKeywords: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },

                    skillsMatch: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },

                    keywordsMatch: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },

                    experienceMatch: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },

                    projectsMatch: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },

                    educationMatch: {
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                    },

                    suggestions: {
                        type: "array",

                        items: {
                            type: "object",

                            properties: {
                                title: {
                                    type: "string",
                                },

                                priority: {
                                    type: "string",
                                },

                                description: {
                                    type: "string",
                                },
                            },

                            required: [
                                "title",
                                "priority",
                                "description",
                            ],
                        },
                    },
                },

                required: [
                    "matchedSkills",
                    "missingKeywords",
                    "skillsMatch",
                    "keywordsMatch",
                    "experienceMatch",
                    "projectsMatch",
                    "educationMatch",
                    "suggestions",
                ],
            },
        },
    });

    const parsedResult = JSON.parse(response.text);

    return atsResultSchema.parse(parsedResult);
};

module.exports = {
    analyzeResumeWithAI,
};