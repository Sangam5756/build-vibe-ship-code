const express = require("express");
const { authController } = require("../../controller");
const {
  registerValidation,
  loginValidation,
} = require("../../validators/auth.validation");
const validateErrorHandler = require("../../utils/Validator");
const authrouter = express.Router();

authrouter.post(
  "/register",
  registerValidation,
  validateErrorHandler,
  authController.register
);
authrouter.post(
  "/login",
  loginValidation,
  validateErrorHandler,
  authController.login
);
authrouter.get("/me", authController.me);

module.exports = authrouter;
