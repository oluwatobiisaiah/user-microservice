import rateLimiter from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

const apiLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 100,
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    message: () => {
      return {
        error: true,
        data:null,
        message: "You are performing too many request on this route,please try again later",
      };
    },
  });

  export default apiLimiter;