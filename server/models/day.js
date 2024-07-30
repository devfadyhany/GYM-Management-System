const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("Day", daySchema);
