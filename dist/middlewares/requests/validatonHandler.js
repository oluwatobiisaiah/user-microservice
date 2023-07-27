"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const validationHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            error: true,
            data: null,
            message: error.details[0].type == "string.pattern.base" ? "Password must be have minimum of 8 characters,a lowecase,an uppercase,a number and a special character" : error.message
        });
        return;
    }
    next();
};
exports.default = validationHandler;
