const AppError = require("../utilities/app_error");
const logger = require('../utilities/winstonLogger')
const errorHandler = (error, req, res, next) => {
  // console.log(error)
  logger.log("error", "this is message for winston");
  if (error.name === "ValidationError")
    return res.status(500).send("validation is failed");

  if (error instanceof AppError)
    return res
      .status(error.statusCode)
      .send({ errorCode: error.errorCode, message: error.message });

  res.status(400).send("some thing failed");
};
module.exports = errorHandler;
