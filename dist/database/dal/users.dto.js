"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const users_model_1 = require("../../models/users.model");
const create = async (payload) => {
    const user = await users_model_1.Users.create(payload);
    return user;
};
exports.create = create;
