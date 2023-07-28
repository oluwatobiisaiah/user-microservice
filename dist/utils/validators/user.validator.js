"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = exports.partialUserValidation = exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validatonHandler_1 = __importDefault(require("../../middlewares/requests/validatonHandler"));
const userValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(30).trim().required(),
        lastName: joi_1.default.string().min(3).max(30).trim().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).max(30).trim().required(),
        userType: joi_1.default.string().valid("admin", "user").trim().required(),
    });
    (0, validatonHandler_1.default)(req, res, next, schema);
};
exports.userValidation = userValidation;
const partialUserValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(30).trim(),
        lastName: joi_1.default.string().min(3).max(30).trim(),
        email: joi_1.default.string().email(),
        userType: joi_1.default.string().valid("admin", "user").trim(),
    });
    (0, validatonHandler_1.default)(req, res, next, schema);
};
exports.partialUserValidation = partialUserValidation;
const userLoginValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().trim().required(),
    });
    (0, validatonHandler_1.default)(req, res, next, schema);
};
exports.userLoginValidation = userLoginValidation;
