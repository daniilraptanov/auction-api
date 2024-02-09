import express from "express";
import { Config } from "./config";
// import { auth } from "./middleware/auth.middleware";

// TODO :: use imports instead require

const app = express();

app.use(express.json());
app.use("/api/v1/user-auth", require("./routes/user-auth.routes"));


// db.db
//   .sync()
//   .then(() => {
    
//   })
//   .catch((err) => console.log(err));

app.listen(Config.app.PORT, () => {
  try {
    return console.log(`server is listening on ${Config.app.PORT}`);
  } catch {
    return console.error(`server error (on ${Config.app.PORT})`);
  }
});
