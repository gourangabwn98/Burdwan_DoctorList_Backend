const LabTest = require("../models/LabTest");

// 🔹 Create Lab Test
exports.createLabTest = async (req, res) => {
  try {
    console.log("Incoming Lab Test:", req.body);

    const labTest = await LabTest.create(req.body);

    res.status(201).json({
      success: true,
      data: labTest,
    });
  } catch (error) {
    console.error("❌ Create LabTest Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Lab Test already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Lab Tests
exports.getAllLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: labTests.length,
      data: labTests,
    });
  } catch (error) {
    console.error("❌ Get LabTests Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get Single Lab Test
exports.getLabTestById = async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.id);

    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found",
      });
    }

    res.status(200).json({
      success: true,
      data: labTest,
    });
  } catch (error) {
    console.error("❌ Get LabTest Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Update Lab Test
exports.updateLabTest = async (req, res) => {
  try {
    const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found",
      });
    }

    res.status(200).json({
      success: true,
      data: labTest,
    });
  } catch (error) {
    console.error("❌ Update LabTest Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Delete Lab Test
exports.deleteLabTest = async (req, res) => {
  try {
    const labTest = await LabTest.findByIdAndDelete(req.params.id);

    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab Test deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete LabTest Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
