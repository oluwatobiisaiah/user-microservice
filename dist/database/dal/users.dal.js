"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.getAll = exports.update = exports.getOneByEmail = exports.getOneById = exports.create = void 0;
const http_status_codes_1 = require("http-status-codes");
const customError_1 = require("../../errors/customError");
const users_model_1 = require("../../models/users.model");
const create = async (payload) => {
    const user = await users_model_1.Users.create(payload);
    return user.dataValues;
};
exports.create = create;
const getOneById = async (id) => {
    const user = await users_model_1.Users.findOne({ where: { id } });
    if (user) {
        return user.dataValues;
    }
    throw (0, customError_1.createCustomError)("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
};
exports.getOneById = getOneById;
const getOneByEmail = async (email) => {
    const user = await users_model_1.Users.findOne({ where: { email } });
    if (user) {
        return user.dataValues;
    }
    throw (0, customError_1.createCustomError)("Invalid Credential", http_status_codes_1.StatusCodes.BAD_REQUEST);
};
exports.getOneByEmail = getOneByEmail;
const update = async (id, payload) => {
    const user = await users_model_1.Users.update(payload, { where: { id } }).then(() => users_model_1.Users.findOne({ where: { id } }));
    if (user) {
        return user.dataValues;
    }
    throw (0, customError_1.createCustomError)("User not found", http_status_codes_1.StatusCodes.UNAUTHORIZED);
};
exports.update = update;
const getAll = async () => {
    const users = await users_model_1.Users.findAll();
    return users.map((user) => {
        const { password, ...rest } = user.dataValues;
        return rest;
    });
};
exports.getAll = getAll;
const deleteOne = async (id) => {
    const user = await users_model_1.Users.destroy({ where: { id } });
    if (user) {
        return user;
    }
    throw (0, customError_1.createCustomError)("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
};
exports.deleteOne = deleteOne;
