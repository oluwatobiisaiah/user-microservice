import { NextFunction, Request, Response } from "express"
import {StatusCodes} from "http-status-codes"
import { createCustomError } from "../../errors/customError"

const notFoundHandlerMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    res.status(StatusCodes.NOT_FOUND).json({
        status:"error",
        error:true,
        message:"Resource not found"
    })
}

export default notFoundHandlerMiddleware