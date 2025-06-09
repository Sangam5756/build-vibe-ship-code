const express = require("express");
const authrouter = require("./auth.routes");
const logRouter = require("./log.routes");
const taskRouter = require("./task.routes");
const v1router = express.Router();


v1router.use("/auth", authrouter);
v1router.use("/logs",logRouter);
v1router.use("/tasks",taskRouter);



module.exports = v1router;;
