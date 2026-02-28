const Service = require("../models/Service");

// 🔹 Create Services (Insert full array)
exports.createServices = async (req, res) => {
  try {
    const services = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("❌ Create Services Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("❌ Get Services Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Add Single Service into Array
exports.addService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { $push: { services: req.body } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("❌ Add Service Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};