import express from "express";
import { Config } from "./config";
import { auth } from "./middleware/auth.middleware";
import { AuctionsRouter } from "./routes/auctions.routes";
import { ImagesRouter } from "./routes/images.routes";
import { RatesRouter } from "./routes/rates.routes";
import { AuthRouter } from "./routes/user-auth.routes";

const cors = require("cors");

const API_V1 = "/api/v1";
Config.setVariables();

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use(`${API_V1}/auth`, AuthRouter);

// Need authorization
app.use(API_V1, auth);
app.use(`${API_V1}/auctions`, AuctionsRouter);
app.use(`${API_V1}/rates`, RatesRouter);
// app.use(`${API_V1}/images`, ImagesRouter);


app.listen(Config.app.PORT, () => {
  try {
    return console.log(`server is listening on ${Config.app.PORT}`);
  } catch {
    return console.error(`server error (on ${Config.app.PORT})`);
  }
});
