import { Sequelize } from "sequelize";
import config from "../configs/config";

import User from "./models/user.model";

export const db: Sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: config.DB_DIALECT,
    host: config.DB_HOST,
  }
);

User.modelInit(db);
