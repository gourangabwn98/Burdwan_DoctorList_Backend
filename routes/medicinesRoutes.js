const express = require("express");
const router = express.Router();

const {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicinesController");

router.post("/", createMedicine);
router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;
