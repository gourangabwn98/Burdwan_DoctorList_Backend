const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createDoctor, getDoctors } = require("../controllers/doctorController");

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), createDoctor);
router.get("/", getDoctors); // ✅ NEW

module.exports = router;
