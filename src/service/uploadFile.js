const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload_file", upload.single("file"), function (req, res) {
  try {
    return res.status(200).json({
      success: true,
      data: `uploads/${req.file.filename}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: error.message,
    });
  }
});

module.exports = router;
