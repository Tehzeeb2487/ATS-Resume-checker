const express = require("express");
const upload = require("../middleware/upload.middleware");
const { analysisresume } = require("../controllers/analysis.controller");
const { testGemini } = require("../services/ai.service")

const router = express.Router();

router.get("/test-ai", async (req, res) => {
    try {
        const result = await testGemini();
        return res.json({
            success: true,
            message: result
        });
    } catch (error) {
        console.error("Error testing AI:", error);
        return res.status(500).json({
            success: false,
            message: "Gemini API test failed.",
            error: error.message
        });
    }
})

router.post("/analyze", upload.single("resume"), analysisresume);

module.exports = router; 