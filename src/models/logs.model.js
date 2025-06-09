const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  sessionId: String,
  actionType: String,
  payload: Object,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
