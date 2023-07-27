import { NextFunction, Request, Response } from "express";
import { CustomAPIError, createCustomError } from "../../errors/customError";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      error: true,
      data: null,
      message: err.message,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      data: null,
      message: "Something went wrong,please try again later.",
    });
  }
};

export default errorHandlerMiddleware;
