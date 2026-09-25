const fs = require("fs/promises");
const { PDFParse } = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    let parser;

    try {
        const buffer = await fs.readFile(filePath);

        parser = new PDFParse({
            data: buffer,
        });

        const result = await parser.getText();

        return result.text.trim();
    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
};

module.exports = {
    extractTextFromPDF,
};
