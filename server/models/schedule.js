const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  Sunday: {
    type: String,
  },
  Monday: {
    type: String,
  },
  Tuesday: {
    type: String,
  },
  Wednesday: {
    type: String,
  },
  Thursday: {
    type: String,
  },
  Friday: {
    type: String,
  },
  Saturday: {
    type: String,
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);
