const { validationResult } = require('express-validator');
const taskService = require('../services/task.services');
const { StatusCodes } = require('http-status-codes');

exports.createTask = async (req, res, next) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const sessionId = req.sessionID;
    console.log('Session ID CReate Task:', sessionId);

    const userId = req?.session?.user?.id;
    const task = await taskService.createTask({ ...req.body, userId },sessionId);
    console.log('Task controller created:', task);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {


    const tasks = await taskService.getUserTasks(req.user.id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }

    const updated = await taskService.updateTask(req.params.id, req.body, req.user.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Task updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.status(StatusCodes.NO_CONTENT).send(); // 204 means no content
  } catch (err) {
    next(err);
  }
};
