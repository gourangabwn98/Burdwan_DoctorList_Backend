const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    mrp: {
      type: String,
    },
    discount: {
      type: String,
    },
    time: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent duplicate test name
labTestSchema.index({ name: 1 }, { unique: true });

// Prevent model overwrite
module.exports =
  mongoose.models.LabTest || mongoose.model("LabTest", labTestSchema);
