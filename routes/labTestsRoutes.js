const express = require("express");
const router = express.Router();

const {
  createLabTest,
  getAllLabTests,
  getLabTestById,
  updateLabTest,
  deleteLabTest,
} = require("../controllers/labTestsController");

router.post("/", createLabTest);
router.get("/", getAllLabTests);
router.get("/:id", getLabTestById);
router.put("/:id", updateLabTest);
router.delete("/:id", deleteLabTest);

module.exports = router;
