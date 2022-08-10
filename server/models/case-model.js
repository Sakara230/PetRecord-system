const mongoose = require("mongoose");

//設定mongodb資料格式
const CaseSchema = new mongoose.Schema({
  petID: {
    type: String,
    required: [true, "must provide ID"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    trim: true,
  },
  doctor: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "must provide type"],
    trim: true,
  },
  describe: {
    type: String,
    trim: true,
    default: "None",
  },
});

module.exports = mongoose.model("Case", CaseSchema);
