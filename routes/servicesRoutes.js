const express = require("express");
const router = express.Router();

const {
  createServices,
  getServices,
  addService,
} = require("../controllers/servicesController");

router.post("/", createServices);
router.get("/", getServices);
router.post("/:id/add", addService);

module.exports = router;
