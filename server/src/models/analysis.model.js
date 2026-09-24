const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        priority: {
            type: String,
            enum: ["high", "medium", "low"],
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const analysisSchema = new mongoose.Schema(
    {
        resumeFileName: {
            type: String,
            required: true,
        },

        jobDescription: {
            type: String,
            required: true,
        },

        atsScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        missingKeywords: {
            type: [String],
            default: [],
        },

        jobMatch: {
            skills: {
                type: Number,
                min: 0,
                max: 100,
            },

            keywords: {
                type: Number,
                min: 0,
                max: 100,
            },

            experience: {
                type: Number,
                min: 0,
                max: 100,
            },

            projects: {
                type: Number,
                min: 0,
                max: 100,
            },

            education: {
                type: Number,
                min: 0,
                max: 100,
            },
        },

        suggestions: {
            type: [suggestionSchema],
            default: [],
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Analysis", analysisSchema);