import { Sequelize } from "sequelize-typescript";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../utils/main/secrets";
import { Users } from "../models/users.model";
const connection = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "mysql",
  logging:false,
  models:[Users]
});

export default connection

