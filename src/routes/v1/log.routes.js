const express = require("express");
const { logController } = require("../../controller");

const logRouter = express.Router();

logRouter.get("/", logController.getLogs);

module.exports = logRouter;
