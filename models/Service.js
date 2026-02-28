const mongoose = require("mongoose");

const serviceItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const serviceSchema = new mongoose.Schema(
  {
    services: [serviceItemSchema],
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ourservice || mongoose.model("ourservice", serviceSchema);
