import { Request, Response } from "express";
import { sendResponse } from "../handlers/response.handler";
import { StatusCodes } from "http-status-codes";
import { logger } from "../handlers/logging.handler";
import { ApiRequest } from "../handlers/request.handler";
import { rateServiceFactory } from "../services/rate.service";
import { RateMapperImpl } from "../mappers/rate.mapper";
import { ICreateRateDTO } from "../types/dto/rate.dto";
import { auctionServiceFactory } from "../services/auction.service";
import { auctionProcessServiceFactory } from "../services/auction-process.service";

export class RateController {
  @logger
  static async createRate(req: Request, res: Response) {
    const auctionProcessService = auctionProcessServiceFactory();
    const auctionService = auctionServiceFactory();
    const rateMapper = new RateMapperImpl();

    const { auctionId, ...data} = ApiRequest.getValidatedParams(req);
    const user = ApiRequest.getUserDTO(req);

    const auction = await auctionService.getAuctionById(auctionId);
    if (!auction) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "Auction not found.");
    }

    const rate = await auctionProcessService.createAuctionRate(data as ICreateRateDTO, auctionId, user.id);
    if (!rate) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Rate does not created.");
    };

    sendResponse(res, StatusCodes.CREATED, "Rate was created.", rateMapper.toDTO(rate));
  }

  @logger
  static async getAllRates(req: Request, res: Response) {
    const rateService = rateServiceFactory();
    const rateMapper = new RateMapperImpl();

    const { page, limit, auctionId } = ApiRequest.getValidatedParams(req);

    const rates = await rateService.getAllRates(page, limit, auctionId);
    if (!rates) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
    };

    sendResponse(res, StatusCodes.OK, "Rates was returned", {
      ...rates,
      rows: rates.rows.map(rate => rateMapper.toDTO(rate))
    });
  }
}

