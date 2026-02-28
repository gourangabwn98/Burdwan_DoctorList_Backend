const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    pack: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent duplicate medicine name
medicineSchema.index({ name: 1 }, { unique: true });

// Prevent model overwrite error
module.exports =
  mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
