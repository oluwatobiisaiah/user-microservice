"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundHandlerMiddleware = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        status: "error",
        error: true,
        message: "Resource not found"
    });
};
exports.default = notFoundHandlerMiddleware;
