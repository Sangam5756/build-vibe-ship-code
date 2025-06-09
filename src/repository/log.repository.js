const Log = require("../models/logs.model");

const saveLog = (logData) => new Log(logData).save();
const getLogs = (filter = {}) => Log.find(filter).sort({ timestamp: -1 });

module.exports = { saveLog, getLogs };
