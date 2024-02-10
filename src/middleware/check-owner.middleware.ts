import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";
import { auctionServiceFactory } from "../services/auction.service";

export const checkAuctionOwner = (paramName = "id", setAuctionToReq = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auctionId = req.params[paramName];
    const user = ApiRequest.getUserDTO(req);
    
    const auction = await auctionServiceFactory().getAuctionById(auctionId);

    if (!auction) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "Auction not found.");
    }

    if (auction.userId !== user.id) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, "User can not have access to this resource.");
    }

    if (setAuctionToReq) {
        ApiRequest.setAuction(req, auction);
    }

    next();
  };
};
