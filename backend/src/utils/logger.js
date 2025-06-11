// src/utils/logger.js
const Log = require("../models/logs.model");

const logger = {
  async logAction(actionType, payload = {}, sessionId) {
    await new Log({ sessionId, actionType, payload });
    // await Log.save();
  },

  async getLogs(sessionId) {
    if (sessionId) {
      return await Log.find({ sessionId }).sort({ timestamp: -1 });
    }
    return await Log.find().sort({ timestamp: -1 });
  },

  async clearLogs() {
    await Log.deleteMany({});
  },
};

module.exports = logger;
