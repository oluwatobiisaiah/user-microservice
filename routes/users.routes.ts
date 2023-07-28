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
  updateUser,
} from "../controllers/users.controllers";
import { validateUserToken, validateUserAdminToken } from "../utils/main/token";

const userRoute = Router();

userRoute.use(apiLimiter); /*Rate Limiter*/

const userToken = new validateUserToken();
const adminToken = new validateUserAdminToken();

userRoute
  .route("/")
  .get(
    adminToken.validateAdminToken,
    asyncWrapper(getAllUsers)
  ) /*Get all users,only accessible to admin */
  .post(userValidation, asyncWrapper(createUser)) /*Create a user */
  .patch(
    userToken.validateToken,
    partialUserValidation,
    asyncWrapper(updateUser)
  ); /*Update a user,only authenticated user can access this */

userRoute
  .route("/:id")
  .get(asyncWrapper(getAUser))
  .delete(
    adminToken.validateAdminToken,
    asyncWrapper(deleteAUser)
  ); /*Delete a user,only accessible to admin */

userRoute.route("/login").post(userLoginValidation, asyncWrapper(loginUser));

export default userRoute;
