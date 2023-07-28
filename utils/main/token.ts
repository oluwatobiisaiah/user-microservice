require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./secrets";
import { UserTokenPayload } from "../types/users";
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

export const generateJWT = (payload: UserTokenPayload, expiry: string) => {
  try {
    return jwt.sign({ payload }, JWT_SECRET, { expiresIn: expiry });
  } catch (error) {}
};

export const decodeJWT = (token: string | undefined) => {
  try {
    return {
      verify: jwt.verify(token, JWT_SECRET),
    };
  } catch (error: any) {
    return {
      verify: false,
      message: error.message,
    };
  }
};

 class validateUserToken {
  public validateToken(req: Request, res: Response, next: NextFunction): void {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
      ) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: true,
          message: "User not authorized to access this route...",
          data: null,
        });
        return;
      }

      const authData = decodeJWT(req.headers.authorization.split(" ")[1]);
      if (authData.verify) {
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: true,
          message: authData.message,
          data: null,
        });
      }
    } catch (error: any) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

class validateUserAdminToken extends validateUserToken {
  public validateAdminToken(req: Request, res: Response, next: NextFunction): void {
    console.log("heree")
    super.validateToken(req, res, () => {
      const { userType } = decodeJWT(req.headers.authorization?.split(" ")[1])
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
export {validateUserAdminToken,validateUserToken}
