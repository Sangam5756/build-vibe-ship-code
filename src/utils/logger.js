// src/utils/logger.js
const { LogModel } = require('../models/logs.model');

const logger = {
  async logAction(actionType, payload = {}, sessionId = 'no_session') {
    await LogModel.create({ sessionId, actionType, payload });
  },

  async getLogs(sessionId = null) {
    if (sessionId) {
      return await LogModel.find({ sessionId }).sort({ timestamp: -1 });
    }
    return await LogModel.find().sort({ timestamp: -1 });
  },

  async clearLogs() {
    await LogModel.deleteMany({});
  },
};

module.exports = logger;
