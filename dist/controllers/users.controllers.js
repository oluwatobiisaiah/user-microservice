"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteAUser = exports.updateUser = exports.getAllUsers = exports.getAUser = exports.createUser = void 0;
const users_dal_1 = require("../database/dal/users.dal");
const customError_1 = require("../errors/customError");
const http_status_codes_1 = require("http-status-codes");
const encryption_1 = require("../utils/main/encryption");
const token_1 = require("../utils/main/token");
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, userType } = req.body;
        const hashedPassword = (0, encryption_1.hash)(password);
        const user = await (0, users_dal_1.create)({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType,
        });
        const { password: uPassword, id, ...rest } = user;
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            error: false,
            message: "User created successfully",
            data: rest,
        });
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.createUser = createUser;
const getAUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, users_dal_1.getOneById)(Number(id));
        if (user) {
            const { password: uPassword, ...rest } = user;
            res.status(http_status_codes_1.StatusCodes.OK).json({
                error: false,
                message: "User fetched successfully",
                data: rest,
            });
        }
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.getAUser = getAUser;
const getAllUsers = async (req, res, next) => {
    try {
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res, next) => {
    try {
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.updateUser = updateUser;
const deleteAUser = async (req, res, next) => {
    try {
        const { id } = req.params;
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.deleteAUser = deleteAUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, users_dal_1.getOneByEmail)(email);
        if (user) {
            const { password: hashedPassword, ...rest } = user;
            if ((0, encryption_1.compare)(password, hashedPassword)) {
                const token = (0, token_1.generateJWT)({ userType: user.userType, sub: { id: user.id } }, "1h");
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    error: false,
                    message: "User logged in successfully",
                    data: rest,
                    token
                });
            }
            else {
                next((0, customError_1.createCustomError)("Invalid credentials", http_status_codes_1.StatusCodes.UNAUTHORIZED));
            }
        }
    }
    catch (error) {
        next((0, customError_1.createCustomError)(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
    }
};
exports.loginUser = loginUser;
