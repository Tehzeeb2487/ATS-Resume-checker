const fs = require("fs/promises");
const {
    extractTextFromPDF,
} = require("../services/pdf.serveice");

const {
    analyzeResumeWithAI
} = require("../services/ai.service");

const Analysis = require("../models/analysis.model");

const analysisresume = async (req, res) => {
    let uploadFilePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume.",
            });
        }

        uploadFilePath = req.file.path;

        const jobDescription = req.body.jobDescription;

        if (!jobDescription || jobDescription.trim().length < 50) {
            return res.status(400).json({
                success: false,
                message: "Job description must contain at least 50 characters.",
            });
        }

        const resumeText = await extractTextFromPDF(uploadFilePath);

        if (!resumeText) {
            return res.status(400).json({
                success: false,
                message:
                    "Could not extract text from this PDF. Please upload a text-based PDF.",
            });
        }

        const aiResult = await analyzeResumeWithAI(
            resumeText,
            jobDescription
        );

        const atsScore = Math.round(
            aiResult.skillsMatch * 0.30 +
            aiResult.keywordsMatch * 0.30 +
            aiResult.experienceMatch * 0.20 +
            aiResult.projectsMatch * 0.10 +
            aiResult.educationMatch * 0.10
        );

        const analysis = new Analysis({
            resumeFileName: req.file.originalname,
            jobDescription,
            atsScore,
            matchedSkills: aiResult.matchedSkills,
            missingKeywords: aiResult.missingKeywords,
            jobMatch: {
                skills: aiResult.skillsMatch,
                keywords: aiResult.keywordsMatch,
                experience: aiResult.experienceMatch,
                projects: aiResult.projectsMatch,
                education: aiResult.educationMatch,
            },
            suggestions: aiResult.suggestions,
        });

        await analysis.save();

        console.log("MongoDB Analysis Saved:");
        console.log(analysis._id);
        console.log("=========== RESUME TEXT ===========");
        console.log(resumeText);
        console.log("===================================");

        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully.",
            data: {
                analysisId: analysis._id,
                resumeFileName: req.file.originalname,
                atsScore,
                matchedSkills: aiResult.matchedSkills,
                missingKeywords: aiResult.missingKeywords,

                jobMatch: {
                    skills: aiResult.skillsMatch,
                    keywords: aiResult.keywordsMatch,
                    experience: aiResult.experienceMatch,
                    projects: aiResult.projectsMatch,
                    education: aiResult.educationMatch,
                },

                suggestions: aiResult.suggestions,
            },
        });
    } catch (error) {
        console.error("Analysis Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing the resume.",
        });
    } finally {
        if (uploadFilePath) {
            try {
                await fs.unlink(uploadFilePath);
            } catch (error) {
                console.error(
                    "Temporary file deletion failed:",
                    error.message
                );
            }
        }
    }
};

module.exports = { analysisresume };