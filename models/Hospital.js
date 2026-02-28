const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    beds: {
      type: String,
    },
    spec: {
      type: String,
    },
    rating: {
      type: Number,
      default: null,
    },
    dist: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Private", "Government"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate hospital name
hospitalSchema.index({ name: 1 }, { unique: true });

// Prevent model overwrite error
module.exports =
  mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);
