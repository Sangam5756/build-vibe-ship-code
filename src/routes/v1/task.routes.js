const express = require("express");
const taskcontroller = require("../../controller/task.controller");
const { authMiddleware } = require("../../utils/auth.middleware");

const taskRouter = express.Router();


taskRouter.use(authMiddleware);

taskRouter.post("/", taskcontroller.createTask);
taskRouter.get("/", taskcontroller.getTasks);
taskRouter.put("/:id", taskcontroller.updateTask);
taskRouter.delete("/:id", taskcontroller.deleteTask);
    
module.exports = taskRouter;
