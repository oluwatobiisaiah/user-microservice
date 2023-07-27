"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (cb) => async (req, res, next) => {
    try {
        await cb(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.default = asyncWrapper;
