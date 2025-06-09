const { fetchLogs } = require("../services/log.service");

const getLogs = async (req, res) => {
  try {
    const logs = await fetchLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

module.exports = { getLogs };
