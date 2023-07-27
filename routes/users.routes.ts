import { Router } from "express";
import apiLimiter from "../middlewares/requests/requestLimiter";
import {
  partialUserValidation,
  userLoginValidation,
  userValidation,
} from "../utils/validators/user.validator";
import asyncWrapper from "../middlewares/requests/asyncWrapper";
import {
  createUser,
  deleteAUser,
  getAUser,
  getAllUsers,
  loginUser,
} from "../controllers/users.controllers";

const userRoute = Router();

userRoute.use(apiLimiter); /*Rate Limiter*/

userRoute
  .route("/")
  .get(asyncWrapper(getAllUsers)) /*Get all users,only accessible to admin */
  .post(userValidation, asyncWrapper(createUser)) /*Create a user */
  .patch(partialUserValidation); /*Update a user */

userRoute
  .route("/:id")
  .get(asyncWrapper(getAUser))
  .delete(asyncWrapper(deleteAUser));
  
userRoute.route("/login").post(userLoginValidation, asyncWrapper(loginUser));

export default userRoute;
