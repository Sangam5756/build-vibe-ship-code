const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends BaseError {
  constructor(propertyName, details) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid request for ${propertyName}`,
      details
    );
  }
}


module.exports = BadRequestError;