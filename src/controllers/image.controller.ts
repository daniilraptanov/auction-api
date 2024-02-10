import { Request, Response } from "express";
import { sendResponse, sendStatusResponse } from "../handlers/response.handler";
import { StatusCodes } from "http-status-codes";
import { logger } from "../handlers/logging.handler";
import { imageServiceFactory } from "../services/image.service";
import { ImageMapperImpl } from "../mappers/image.mapper";
import { ICreateImageDTO } from "../types/dto/image.dto";
import { ApiRequest } from "../handlers/request.handler";

export class ImageController {
  @logger
  static async createImage(req: Request, res: Response) {
    const imageService = imageServiceFactory();
    const imageMapper = new ImageMapperImpl();

    const data: ICreateImageDTO = ApiRequest.getValidatedParams(req);
      
    const auction = ApiRequest.getAuction(req);
    if (!auction) {
        return sendResponse(res, StatusCodes.NOT_FOUND, "Auction not found.");
    }

    const image = await imageService.createImage(data, auction.id);
    if (!image) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Image does not created.");
    };

    sendResponse(res, StatusCodes.CREATED, "Image was created.", imageMapper.toDTO(image));
  }

  @logger
  static async deleteImage(req: Request, res: Response) {
    const imageService = imageServiceFactory();

    const { id } = ApiRequest.getValidatedParams(req);
    
    const isDeleted = await imageService.deleteImage(id);
    if (!isDeleted) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Image does not deleted.");
    };

    sendStatusResponse(res, StatusCodes.CREATED, "Image was deleted.", isDeleted);
  }
}

