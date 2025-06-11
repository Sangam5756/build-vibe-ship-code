const { NotFoundError } = require("../errors/notFound.error");
const taskRepo = require("../repository/task.repository");
const logger = require("../utils/logger");

exports.createTask = async (data) => {
  if (!data.title) {
    throw new Error("Task title is required");
  }

  const task = await taskRepo.createTask(data);
  await logger.logAction(
    "Task Created",
    { taskId: task._id, title: task.title },
    data?.userId
  );
  return task;
};

exports.getUserTasks = async (userId) => {
  const tasks = await taskRepo.getTasksByUser(userId);
  await logger.logAction("Fetched Tasks", { count: tasks.length }, userId);
  return tasks;
};

exports.updateTask = async (taskId, updates, userId) => {
  const updated = await taskRepo.updateTask(taskId, updates);
  if (!updated) {
    throw new NotFoundError("task", taskId);
  }
  await logger.logAction("Task Updated", { taskId, updates }, userId);
  return updated;
};

exports.deleteTask = async (taskId, userId) => {
  const deleted = await taskRepo.deleteTask(taskId);
  if (!deleted) {
    throw new NotFoundError("task", taskId);
  }
  await logger.logAction("Task Deleted", { taskId }, userId);
  return deleted;
};
