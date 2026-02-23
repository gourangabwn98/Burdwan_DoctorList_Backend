const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: String,
  startTime: String,
  endTime: String,
});

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },

    // Multiple qualifications
    qualifications: [String],

    about: { type: String, required: true },
    clinicName: { type: String, required: true },
    clinicAddress: { type: String, required: true },
    clinicPhone: { type: String, required: true },

    // Multiple availability entries
    availability: [availabilitySchema],

    photo: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
