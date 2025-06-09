const taskService = require('../services/task.services');

exports.createTask = async (req, res) => {
  const userId = req.user.id; // Assuming auth middleware sets req.user
  const task = await taskService.createTask({ ...req.body, userId });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getUserTasks(req.user.id);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const updated = await taskService.updateTask(req.params.id, req.body, req.user.id);
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.id);
  res.status(204).send();
};
