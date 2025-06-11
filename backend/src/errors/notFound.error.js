const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFoundError extends BaseError{
    constructor(resourceName,details){
        super(
            "NotFoundError",
            StatusCodes.NOT_FOUND,
            `${resourceName} not found`,
            details
        )
    }
}

module.exports = NotFoundError;