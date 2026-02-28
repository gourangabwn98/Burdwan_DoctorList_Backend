const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
      trim: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    clinicPhone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate clinic names
clinicSchema.index({ clinicName: 1 }, { unique: true });

// module.exports = mongoose.model("clinic", clinicSchema);
module.exports = mongoose.model("Clinic", clinicSchema, "clinics");
