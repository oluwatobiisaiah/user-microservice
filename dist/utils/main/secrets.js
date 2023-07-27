"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_ORIGINS = exports.NODE_ENV = exports.APP_VERSION = exports.PORT = exports.JWT_SECRET = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.DB_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, PORT, APP_VERSION, NODE_ENV } = process.env;
exports.DB_PORT = DB_PORT;
exports.DB_HOST = DB_HOST;
exports.DB_USER = DB_USER;
exports.DB_PASSWORD = DB_PASSWORD;
exports.DB_NAME = DB_NAME;
exports.JWT_SECRET = JWT_SECRET;
exports.PORT = PORT;
exports.APP_VERSION = APP_VERSION;
exports.NODE_ENV = NODE_ENV;
const requiredCredentials = ["DB_HOST", "DB_USER", "DB_NAME", "DB_PASSWORD"];
for (const credential of requiredCredentials) {
    if (credential === undefined) {
        console.log(`The credentail ${credential} is missing`);
        process.exit(1);
    }
}
const ALLOWED_ORIGINS = [];
exports.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
