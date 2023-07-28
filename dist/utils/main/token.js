"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserToken = exports.validateUserAdminToken = exports.decodeJWT = exports.generateJWT = void 0;
require("dotenv").config();
const secrets_1 = require("./secrets");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const generateJWT = (payload, expiry) => {
    try {
        return jwt.sign({ payload }, secrets_1.JWT_SECRET, { expiresIn: expiry });
    }
    catch (error) { }
};
exports.generateJWT = generateJWT;
const decodeJWT = (token) => {
    try {
        return {
            verify: jwt.verify(token, secrets_1.JWT_SECRET),
        };
    }
    catch (error) {
        return {
            verify: false,
            message: error.message,
        };
    }
};
exports.decodeJWT = decodeJWT;
class validateUserToken {
    validateToken(req, res, next) {
        try {
            if (!req.headers.authorization ||
                !req.headers.authorization.startsWith("Bearer ")) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: true,
                    message: "User not authorized to access this route...",
                    data: null,
                });
                return;
            }
            const authData = (0, exports.decodeJWT)(req.headers.authorization.split(" ")[1]);
            if (authData.verify) {
                next();
            }
            else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: true,
                    message: authData.message,
                    data: null,
                });
            }
        }
        catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: "error",
                message: error.message,
            });
        }
    }
}
exports.validateUserToken = validateUserToken;
class validateUserAdminToken extends validateUserToken {
    validateAdminToken(req, res, next) {
        console.log("heree");
        super.validateToken(req, res, () => {
            const { userType } = (0, exports.decodeJWT)(req.headers.authorization?.split(" ")[1])
                .verify.payload;
            if (userType !== "admin") {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: true,
                    message: "Only admins are privileged to access this route",
                    data: null,
                });
                return;
            }
            next();
        });
    }
}
exports.validateUserAdminToken = validateUserAdminToken;
