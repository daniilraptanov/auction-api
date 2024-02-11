import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { checkAuctionOwner, checkImageOwner } from "../middleware/check-owner.middleware";
import { validateParams } from "../middleware/validate-params.middleware";
import { deleteImageSchema, imageSchema } from "../schemas/image.schemas";

const ImagesRouter = Router();

ImagesRouter.post(
  "/:auctionId",
  validateParams(imageSchema),
  checkAuctionOwner("auctionId"),
  ImageController.createImage
);

ImagesRouter.delete(
  "/:id",
  validateParams(deleteImageSchema),
  checkImageOwner(),
  ImageController.deleteImage
);

export { ImagesRouter };
