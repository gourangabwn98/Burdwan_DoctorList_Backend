const Speciality = require("../models/Speciality");
const Qualification = require("../models/Qualification");

// Speciality
exports.getSpeciality = async (req, res) => {
  const data = await Speciality.find().sort({ name: 1 });
  res.json(data);
};

exports.addSpeciality = async (req, res) => {
  const data = await Speciality.create(req.body);
  res.json(data);
};

// Qualification
exports.getQualification = async (req, res) => {
  const data = await Qualification.find().sort({ name: 1 });
  res.json(data);
};

exports.addQualification = async (req, res) => {
  const data = await Qualification.create(req.body);
  res.json(data);
};
