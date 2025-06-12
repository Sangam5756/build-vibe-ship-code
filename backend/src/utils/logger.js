// src/utils/logger.js
const Log = require("../models/logs.model");

const logger = {
  async logAction(actionType, payload = {}, sessionId) {
    const log = new Log({
      sessionId: sessionId,
      action_type: actionType,
      payload,
      timestamp: Date.now() / 1000,
    });
    await log.save();
  },

  async getLogs(sessionId) {
    if (sessionId) {
      return await Log.find({ sessionId: sessionId }).sort({ timestamp: -1 });
    }
    return await Log.find().sort({ timestamp: -1 });
  },

  async clearLogs() {
    await Log.deleteMany({});
  },
};

module.exports = logger;
