"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestLimiter_1 = __importDefault(require("../middlewares/requests/requestLimiter"));
const user_validator_1 = require("../utils/validators/user.validator");
const asyncWrapper_1 = __importDefault(require("../middlewares/requests/asyncWrapper"));
const users_controllers_1 = require("../controllers/users.controllers");
const userRoute = (0, express_1.Router)();
userRoute.use(requestLimiter_1.default); /*Rate Limiter*/
userRoute
    .route("/")
    .get((0, asyncWrapper_1.default)(users_controllers_1.getAllUsers)) /*Get all users,only accessible to admin */
    .post(user_validator_1.userValidation, (0, asyncWrapper_1.default)(users_controllers_1.createUser)) /*Create a user */
    .patch(user_validator_1.partialUserValidation); /*Update a user */
userRoute
    .route("/:id")
    .get((0, asyncWrapper_1.default)(users_controllers_1.getAUser))
    .delete((0, asyncWrapper_1.default)(users_controllers_1.deleteAUser));
userRoute.route("/login").post(user_validator_1.userLoginValidation, (0, asyncWrapper_1.default)(users_controllers_1.loginUser));
exports.default = userRoute;
