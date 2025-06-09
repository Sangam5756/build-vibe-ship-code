const express = require("express");
const authrouter = require("./auth.routes");
const logRouter = require("./log.routes");
const v1router = express.Router();


v1router.use("/auth", authrouter);
v1router.use("/logs",logRouter);



module.exports = v1router;;
