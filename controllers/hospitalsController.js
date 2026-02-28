const Hospital = require("../models/Hospital");

// 🔹 Create Hospital
exports.createHospital = async (req, res) => {
  try {
    console.log("Incoming Hospital:", req.body);

    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error("❌ Create Hospital Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Hospital already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals,
    });
  } catch (error) {
    console.error("❌ Get Hospitals Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get Hospital By ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error("❌ Get Hospital Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Update Hospital
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error("❌ Update Hospital Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Delete Hospital
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Hospital Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
