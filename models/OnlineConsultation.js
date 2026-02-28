const mongoose = require("mongoose");

const onlineConsultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    speciality: {
      type: String,
    },
    qualifications: {
      type: [String],
    },
    about: {
      type: String,
    },

    // Clinic Info
    clinicName: String,
    clinicAddress: String,
    clinicPhone: String,

    availability: {
      type: Array,
      default: [],
    },

    photo: {
      type: String,
      default: null,
    },

    // Online Consultation Fields
    avail: {
      type: String,
      default: "Available now",
    },
    avatar: {
      type: String,
    },
    exp: {
      type: String,
    },
    fee: {
      type: String,
    },
    lang: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
    },
    wait: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent duplicate doctor name
onlineConsultationSchema.index({ name: 1 }, { unique: true });

module.exports =
  mongoose.models.OnlineConsultation ||
  mongoose.model("OnlineConsultation", onlineConsultationSchema);
