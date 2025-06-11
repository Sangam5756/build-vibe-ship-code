const express = require("express");
const taskcontroller = require("../../controller/task.controller");
const { isAuthenticated } = require("../../utils/auth.middleware");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../../validators/task.validator");

const taskRouter = express.Router();

taskRouter.use(isAuthenticated);

taskRouter.post("/", validateCreateTask, taskcontroller.createTask);
taskRouter.get("/", taskcontroller.getTasks);
taskRouter.put("/:id", validateUpdateTask, taskcontroller.updateTask);
taskRouter.delete("/:id", taskcontroller.deleteTask);

module.exports = taskRouter;
