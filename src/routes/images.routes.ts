import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { checkAuctionOwner } from "../middleware/check-owner.middleware";
import { validateParams } from "../middleware/validate-params.middleware";
import { deleteImageSchema, imageSchema } from "../schemas/image.schemas";

const ImagesRouter = Router();

ImagesRouter.post(
  "/:auctionId",
  validateParams(imageSchema),
  checkAuctionOwner("auctionId", true),
  ImageController.createImage
);

ImagesRouter.delete(
  "/:auctionId/:id",
  validateParams(deleteImageSchema),
  checkAuctionOwner("auctionId"),
  ImageController.deleteImage
);

export { ImagesRouter };
