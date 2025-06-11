const express = require("express");
const { logController } = require("../../controller");
const { isAuthenticated } = require("../../utils/auth.middleware");

const logRouter = express.Router();

logRouter.use(isAuthenticated);
logRouter.get("/", logController.getLogs);

module.exports = logRouter;
