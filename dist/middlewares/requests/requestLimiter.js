"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_codes_1 = require("http-status-codes");
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    statusCode: http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS,
    message: () => {
        return {
            error: true,
            data: null,
            message: "You are performing too many request on this route,please try again later",
        };
    },
});
exports.default = apiLimiter;
