const { StatusCodes } = require("http-status-codes");
const { fetchLogs } = require("../services/log.service");

const newSyntheticSession = async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    console.log(`New synthetic session created with ID: ${sessionId}`);
    res.status(StatusCodes.OK).json({ session_id: req.sessionID });
  } catch (err) {
    next(err);
  }
};

const logEvent = async (req, res) => {
  try {
    const session_id = req.sessionID;
    const { actionType, payload } = req.body;

    if (!actionType || !payload) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    await Log.create({
      session_id,
      action_type: actionType,
      timestamp: Date.now() / 1000,
      payload,
    });

    res.status(StatusCodes.OK).json({ status: "logged" });
  } catch (error) {
    next(error);
  }
};

const getLogs = async (req, res) => {
  try {
    const logs = await fetchLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

const clearLogs = async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(StatusCodes.OK).json({ message: "Logs cleared successfully" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to clear logs" });
  }
};

module.exports = { getLogs, newSyntheticSession, logEvent ,clearLogs};
