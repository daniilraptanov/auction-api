import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Config } from "../config";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";
import { TokenService } from "../services/token.service";

const jwt = require("jsonwebtoken");

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return sendResponse(res, StatusCodes.UNAUTHORIZED, "Authorization Error");
    }

    const decoded = TokenService.decodeAuthToken(token)
    ApiRequest.setUserDTO(req, decoded);
    next();
  } catch {
    sendResponse(res, StatusCodes.UNAUTHORIZED, "Authorization Error");
  }
};
