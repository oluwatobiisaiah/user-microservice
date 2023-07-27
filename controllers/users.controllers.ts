import { NextFunction, Request, Response } from "express";
import { Users } from "../models/users.model";
import { create, getOneByEmail, getOneById } from "../database/dal/users.dal";
import { UserOuput } from "../utils/types/users";
import { createCustomError } from "../errors/customError";
import { StatusCodes } from "http-status-codes";
import { compare, hash } from "../utils/main/encryption";
import { generateJWT } from "../utils/main/token";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;
    const hashedPassword = hash(password);
    const user = await create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });
    const { password: uPassword, id, ...rest } = user;

    res.status(StatusCodes.CREATED).json({
      error: false,
      message: "User created successfully",
      data: rest,
    });
  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

export const getAUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getOneById(Number(id));
    if (user) {
        const { password: uPassword, ...rest } = user;
        res.status(StatusCodes.OK).json({
            error: false,
            message: "User fetched successfully",
            data: rest,
        });
    }
  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

export const deleteAUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;

  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email,password} = req.body;

    const user = await getOneByEmail(email);
    if( user){
        const {password:hashedPassword,...rest} = user;

        if(compare(password,hashedPassword)){
            const token = generateJWT({userType:user.userType,sub:{id:user.id}},"1h");
            res.status(StatusCodes.OK).json({
                error:false,
                message:"User logged in successfully",
                data:rest,
                token
            })
        }else{

            next(createCustomError("Invalid credentials",StatusCodes.UNAUTHORIZED))
        }
     
    }
  } catch (error: any) {
    next(createCustomError(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};
