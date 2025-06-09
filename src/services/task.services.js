const taskRepo = require("../repository/task.repository");
const logger = require("../utils/logger");

exports.createTask = async (data, userId) => {
  const task = await taskRepo.createTask(data);
  await logger.logAction("Task Created", task, userId);
  return task;
};

exports.getUserTasks = async (userId) => {
  const tasks = await taskRepo.getTasksByUser(userId);
  await logger.logAction(
    "Fetched Tasks",
    { userId, count: tasks.length },
    userId
  );
  return tasks;
};

exports.updateTask = async (taskId, updates, userId) => {
  const updated = await taskRepo.updateTask(taskId, updates);
  await logger.logAction("Task Updated", updated, userId);
  return updated;
};

exports.deleteTask = async (taskId, userId) => {
  const deleted = await taskRepo.deleteTask(taskId);
  await logger.logAction("Task Deleted", deleted, userId);
  return deleted;
};
