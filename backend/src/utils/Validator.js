const { validationResult } = require("express-validator");

const validateErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: errors.mapped(),
      data: {},
    });
  }
  next();
};

module.exports = validateErrorHandler;
