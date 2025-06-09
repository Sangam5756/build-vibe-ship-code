const Task = require('../models/task.model');

exports.createTask = (data) => Task.create(data);
exports.getTasksByUser = (userId) => Task.find({ userId });
exports.updateTask = (taskId, updates) => Task.findByIdAndUpdate(taskId, updates, { new: true });
exports.deleteTask = (taskId) => Task.findByIdAndDelete(taskId);
