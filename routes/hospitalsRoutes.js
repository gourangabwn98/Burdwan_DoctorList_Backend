const express = require("express");
const router = express.Router();

const {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalsController");

router.post("/", createHospital);
router.get("/", getAllHospitals);
router.get("/:id", getHospitalById);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);

module.exports = router;
