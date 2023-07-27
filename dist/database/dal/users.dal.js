"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneByEmail = exports.getOneById = exports.create = void 0;
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
    throw new Error("User not found");
};
exports.getOneById = getOneById;
const getOneByEmail = async (email) => {
    const user = await users_model_1.Users.findOne({ where: { email } });
    if (user) {
        return user.dataValues;
    }
    throw new Error("User not found");
};
exports.getOneByEmail = getOneByEmail;
