import { Router } from "express";
import { RateController } from "../controllers/rate.controller";
import { validateParams } from "../middleware/validate-params.middleware";
import { getAllRatesSchema, rateSchema } from "../schemas/rate.schemas";

const RatesRouter = Router();

RatesRouter.post(
  "/:auctionId",
  validateParams(rateSchema),
  RateController.createRate
);

RatesRouter.get(
  "/:auctionId",
  validateParams(getAllRatesSchema),
  RateController.getAllRates
);

export { RatesRouter };
