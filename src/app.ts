import express from "express";
import { auth } from "./middleware/auth.middleware";
import config from "../configs/config";

// TODO :: use imports instead require

const app = express();

app.use(express.json());
app.use("/api/v1/user-auth", require("./routes/user-auth.routes"));


const db = require("./db");

db.db
  .sync()
  .then(() => {
    app.listen(config.PORT, () => {
      try {
        return console.log(`server is listening on ${config.PORT}`);
      } catch {
        return console.error(`server error (on ${config.PORT})`);
      }
    });
  })
  .catch((err) => console.log(err));
