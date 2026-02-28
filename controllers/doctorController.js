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
// exports.getDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find().sort({ createdAt: -1 });
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getDoctors = async (req, res) => {
  try {
    // ── Get query parameters with safe defaults ────────────────────────────
    const page = parseInt(req.query.page) || 1; // current page (1-based)
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit; // how many to skip

    // Optional filters (you can add more later)
    const speciality = req.query.speciality; // e.g. ?speciality=Cardiologist
    const search = req.query.search; // e.g. ?search=Dr. Amit

    // ── Build the query object ────────────────────────────────────────────
    const query = {};

    if (speciality) {
      query.speciality = speciality; // exact match (case-sensitive)
      // If you want case-insensitive: query.speciality = new RegExp(`^${speciality}$`, 'i');
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // search in name
        { speciality: { $regex: search, $options: "i" } },
      ];
    }

    // ── Get total count of matching documents (needed for frontend pagination) ──
    const total = await Doctor.countDocuments(query);

    // ── Fetch paginated results ────────────────────────────────────────────
    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // newest first (change as needed)
      .lean(); // faster — returns plain JS objects

    // ── Calculate pagination metadata ─────────────────────────────────────
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // ── Send rich, consistent response ─────────────────────────────────────
    res.status(200).json({
      success: true,
      count: doctors.length, // how many returned this page
      total, // total matching doctors
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
    console.error("getDoctors error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching doctors",
      error: error.message,
    });
  }
};
