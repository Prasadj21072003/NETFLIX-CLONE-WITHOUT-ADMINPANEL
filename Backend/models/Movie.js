const mongoose = require("mongoose");

const Movieschema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },

  img: { type: String },
  imgtitle: { type: String, default: "" },
  imgsmall: { type: String },
  trailer: { type: String },
  year: { type: String },
  limit: { type: Number },
  genre: { type: String },
  isseries: { type: Boolean, default: false },
});

module.exports = mongoose.model("Movie", Movieschema);
