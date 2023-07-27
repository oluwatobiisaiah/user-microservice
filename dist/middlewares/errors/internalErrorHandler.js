"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../errors/customError");
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customError_1.CustomAPIError) {
        return res.status(err.statusCode).json({
            error: true,
            data: null,
            message: err.message,
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: null,
            message: "Something went wrong,please try again later.",
        });
    }
};
exports.default = errorHandlerMiddleware;
