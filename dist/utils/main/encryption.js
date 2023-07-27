"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hash = (password) => bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
exports.hash = hash;
const compare = (password, hashedPassword) => bcryptjs_1.default.compareSync(password, hashedPassword);
exports.compare = compare;
