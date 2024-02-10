import express from "express";
import { Config } from "./config";
import { auth } from "./middleware/auth.middleware";
import { AuctionsRouter } from "./routes/auctions.routes";
import { AuthRouter } from "./routes/user-auth.routes";

// TODO :: use imports instead require
const API_V1 = "/api/v1";

const app = express();

app.use(express.json());

// Public routes
app.use(`${API_V1}/auth`, AuthRouter);

// Need authorization
app.use(API_V1, auth);
app.use(`${API_V1}/auctions`, AuctionsRouter);



// TODO
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
