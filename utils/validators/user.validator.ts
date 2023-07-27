import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import validationHandler from "../../middlewares/requests/validatonHandler";

export const userValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).trim().required(),
    lastName: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).trim().required(),
    userType: Joi.string().valid("admin", "user").trim().required(),
  });

  validationHandler(req, res, next, schema);
};

export const partialUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).trim().required(),
    lastName: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().required(),
    userType: Joi.string().valid("admin", "user").trim().required(),
  });

  validationHandler(req, res, next, schema);
};

export const userLoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
  });

  validationHandler(req, res, next, schema);
};
