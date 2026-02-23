const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Qualification", qualificationSchema);
