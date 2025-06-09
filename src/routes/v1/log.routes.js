const express = require("express");
const { getLogs } = require("../../controller/log.controller");
const logRouter = express.Router();

logRouter.get("/", getLogs);

module.exports = logRouter;
