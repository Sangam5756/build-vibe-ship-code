const { NotFoundError } = require("../errors/notFound.error");
const taskRepo = require("../repository/task.repository");
const logger = require("../utils/logger");

exports.createTask = async (data, sessionId) => {
  if (!data.title) {
    throw new Error("Task title is required");
  }

  const task = await taskRepo.createTask(data);

  await logger.logAction(
    "New Task Is Created",
    { taskId: task._id, title: task.title, userId: data.userId },
    sessionId
  );
  return task;
};

exports.getUserTasks = async (userId, sessionId) => {
  const tasks = await taskRepo.getTasksByUser(userId);
  await logger.logAction("Fetched Tasks", { count: tasks.length }, sessionId);
  return tasks;
};

exports.updateTask = async (taskId, updates, userId, sessionId) => {
  const updated = await taskRepo.updateTask(taskId, updates);
  if (!updated) {
    throw new NotFoundError("task", taskId);
  }
  await logger.logAction("Task Updated", { taskId, updates }, sessionId);
  return updated;
};

exports.deleteTask = async (taskId, userId, sessionId) => {
  const deleted = await taskRepo.deleteTask(taskId);
  if (!deleted) {
    throw new NotFoundError("task", taskId);
  }
  await logger.logAction("Task Deleted", { taskId }, sessionId);
  return deleted;
};
