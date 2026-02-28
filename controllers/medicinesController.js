const Medicine = require("../models/Medicine");

// 🔹 Create Medicine
exports.createMedicine = async (req, res) => {
  try {
    console.log("Incoming Medicine:", req.body);

    const medicine = await Medicine.create(req.body);

    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    console.error("❌ Create Medicine Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Medicine already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines,
    });
  } catch (error) {
    console.error("❌ Get Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get Single Medicine
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    console.error("❌ Get Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Update Medicine
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    console.error("❌ Update Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Delete Medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
