const multer = require("multer");

const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed."));
        }

        cb(null, true);
    },
});

module.exports = upload;