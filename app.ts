import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import helmet from "helmet";
import {
  ALLOWED_ORIGINS,
  APP_VERSION,
  NODE_ENV,
  PORT,
} from "./utils/main/secrets";
import notFoundHandlerMiddleware from "./middlewares/errors/notFound";
import errorHandlerMiddleware from "./middlewares/errors/internalErrorHandler";
import cors from "cors";
// import xss from "xss-clean";
import formData from "express-form-data";
import connection from "./config/database.config";
import userRoute from "./routes/users.routes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(xss())
app.use(formData.parse())

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);


app.disable("x-powered-by");
app.get(`/api/${APP_VERSION}`, (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    error: false,
    message: "User Microservice ⚡️",
    data: null,
  });
});

// routes
app.use(`/api/${APP_VERSION}/users`, userRoute);


app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);
(async () => {
  await connection
    .sync()
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err) => {
      console.log(err.message);
      return process.exit(1);
    });

  app.listen(PORT, () => {
    if (NODE_ENV === "development") {
      console.log(
        `<<<<<<<<<<<<<<<< Yeeeep,Server running on port ${PORT}..>>>>>>>>>>>`
      );
    }
  });
})();
