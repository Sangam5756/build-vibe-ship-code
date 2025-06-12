const express = require("express");
const { logController } = require("../../controller");
const { isAuthenticated } = require("../../utils/auth.middleware");

const logRouter = express.Router();

logRouter.get("/new_session", logController.newSyntheticSession);
logRouter.get("/log_event", logController.logEvent);
logRouter.get("/", logController.getLogs);

module.exports = logRouter;
