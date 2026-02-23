const express = require("express");
const router = express.Router();
const {
  getSpeciality,
  addSpeciality,
  getQualification,
  addQualification,
} = require("../controllers/metaController");

router.get("/speciality", getSpeciality);
router.post("/speciality", addSpeciality);

router.get("/qualification", getQualification);
router.post("/qualification", addQualification);

module.exports = router;
