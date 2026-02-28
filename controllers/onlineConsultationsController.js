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

// Get All - WITH PAGINATION
exports.getAllDoctors = async (req, res) => {
  try {
    // ── Pagination parameters ────────────────────────────────────────
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional filters (you can add more later)
    const speciality = req.query.speciality;
    const search = req.query.search;

    // Build query
    const query = {};

    if (speciality) {
      query.speciality = speciality;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { speciality: { $regex: search, $options: "i" } },
      ];
    }

    // Get total count (very important for frontend)
    const total = await OnlineConsultation.countDocuments(query);

    // Get paginated results
    const doctors = await OnlineConsultation.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // newest first (change if needed)
      .lean(); // better performance

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Response
    res.status(200).json({
      success: true,
      count: doctors.length, // how many returned this page
      total, // total matching records
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        perPage: limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
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
