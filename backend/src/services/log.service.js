const { saveLog, getLogs } = require("../repository/log.repository");


const logAction = async ({ sessionId, actionType, payload }) => {
  await saveLog({ sessionId, actionType, payload });
};

const fetchLogs = async (filter) => {
  return await getLogs(filter);
};

module.exports = { logAction, fetchLogs };
