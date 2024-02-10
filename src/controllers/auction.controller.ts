import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../handlers/logging.handler";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";
import { AuctionMapperImpl } from "../mappers/auction.mapper";
import { auctionServiceFactory } from "../services/auction.service";
import { ICreateAuctionDTO, IPlainAuctionDTO } from "../types/dto/auction.dto";

export class AuctionController {
    @logger
    static async createAuction(req: Request, res: Response) {
        const auctionService = auctionServiceFactory();
        const auctionMapper = new AuctionMapperImpl();

        const data: ICreateAuctionDTO = ApiRequest.getValidatedParams(req);
        const user = ApiRequest.getUserDTO(req);

        const auction = await auctionService.createAuction(data, user.id);
        if (!auction) {
            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Auction was not created.");
        }

        sendResponse(res, StatusCodes.CREATED, "Auction was created.", auctionMapper.toDTO(auction));
    }

    @logger
    static async updateAuction(req: Request, res: Response) {
        const auctionService = auctionServiceFactory();
        const auctionMapper = new AuctionMapperImpl();

        const { id, ...data } = ApiRequest.getValidatedParams(req);

        const auction = await auctionService.updateAuction(data as IPlainAuctionDTO, id);
        if (!auction) {
            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Auction was not updated.");
        }

        sendResponse(res, StatusCodes.OK, "Auction was updated.", auctionMapper.toDTO(auction));
    }

    @logger
    static async getAllAuctions(req: Request, res: Response) {
        const auctionService = auctionServiceFactory();
        const auctionMapper = new AuctionMapperImpl();

        const { page, limit, getMainImage } = ApiRequest.getValidatedParams(req);

        const auctions = await auctionService.getAllAuctions(page, limit, getMainImage);
        if (!auctions) {
            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        sendResponse(res, StatusCodes.OK, "Auctions was returned.", auctions.map(auction => auctionMapper.toDTO(auction)));
    }

    @logger
    static async getAuctionById(req: Request, res: Response) {
        const auctionService = auctionServiceFactory();
        const auctionMapper = new AuctionMapperImpl();

        const { id, getImages } = ApiRequest.getValidatedParams(req);

        const plainAuction = ApiRequest.getAuction(req);
        if (!getImages && plainAuction) {
            return sendResponse(res, StatusCodes.OK, "Auction was returned", auctionMapper.toDTO(plainAuction));
        }

        const auction = await auctionService.getAuctionById(id, getImages);
        if (!auction) {
            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        sendResponse(res, StatusCodes.OK, "Auction was returned.", auctionMapper.toDTO(auction));
    }
}
