"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const secrets_1 = require("../utils/main/secrets");
const users_model_1 = require("../models/users.model");
const connection = new sequelize_typescript_1.Sequelize({
    database: secrets_1.DB_NAME,
    username: secrets_1.DB_USER,
    password: secrets_1.DB_PASSWORD,
    host: secrets_1.DB_HOST,
    port: Number(secrets_1.DB_PORT),
    dialect: "mysql",
    logging: false,
    models: [users_model_1.Users]
});
exports.default = connection;
