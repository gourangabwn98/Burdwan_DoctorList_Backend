const Clinic = require("../models/Clinic");

// 🔹 Create Clinic
exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json({
      success: true,
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Clinics
exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clinics.length,
      data: clinics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get Single Clinic
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }

    res.status(200).json({
      success: true,
      data: clinic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Update Clinic
exports.updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Delete Clinic
exports.deleteClinic = async (req, res) => {
  try {
    await Clinic.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Clinic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
