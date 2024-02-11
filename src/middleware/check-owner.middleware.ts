import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";
import { auctionServiceFactory } from "../services/auction.service";
import { imageServiceFactory } from "../services/image.service";
import { IAuctionModel } from "../types/auction.type";
import { ImageModel } from "../types/image.type";


const checkEntityOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
  getEntityPromise: Promise<IAuctionModel> | Promise<ImageModel>
) => {
  const user = ApiRequest.getUserDTO(req);
  
  const entity = await getEntityPromise;

  if (!entity) {
      return sendResponse(res, StatusCodes.NOT_FOUND, "Entity not found.");
  }

  if (entity.userId !== user.id) {
      return sendResponse(res, StatusCodes.UNAUTHORIZED, "User can not have access to this resource.");
  }

  next();
}


export const checkAuctionOwner = (paramName = "id") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auctionId = req.params[paramName];
    return checkEntityOwner(req, res, next, auctionServiceFactory().getAuctionById(auctionId));
  }
};

export const checkImageOwner = (paramName = "id") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const imageId = req.params[paramName];
    return checkEntityOwner(req, res, next, imageServiceFactory().getImageById(imageId));
  }
};
