const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Speciality", specialitySchema);
