import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";
import { auctionServiceFactory } from "../services/auction.service";


// TODO
export const checkAuctionStatus = (auctionIdParam = "id", requiredStatus) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auctionId = req.params[auctionIdParam];
    const auction = (
        ApiRequest.getAuction(req) || 
        await auctionServiceFactory().getAuctionById(auctionId)
    );

    const user = ApiRequest.getUserDTO(req);

    if (!auction) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "Auction not found.");
    }

    next();
  };
};
