const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const { qualifications, availability, ...rest } = req.body;

    const doctor = await Doctor.create({
      ...rest,
      qualifications: JSON.parse(qualifications || "[]"),
      availability: JSON.parse(availability || "[]"),
      photo: req.file ? req.file.filename : null,
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET ALL DOCTORS
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
