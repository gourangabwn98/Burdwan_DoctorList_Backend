const OnlineConsultation = require("../models/OnlineConsultation");

// Create
exports.createDoctor = async (req, res) => {
  try {
    console.log("Incoming Online Doctor:", req.body);

    const doctor = await OnlineConsultation.create(req.body);

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("❌ Create Online Doctor Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await OnlineConsultation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    console.error("❌ Get Online Doctors Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await OnlineConsultation.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("❌ Get Doctor Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await OnlineConsultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("❌ Update Doctor Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await OnlineConsultation.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Doctor Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
