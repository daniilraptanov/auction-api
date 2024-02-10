import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Config } from "../config";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";

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

    // TODO :: replace to service
    const decoded = jwt.verify(token, Config.app.JWT_SECRET_KEY);
    ApiRequest.setUserDTO(req, decoded);
    next();
  } catch {
    sendResponse(res, StatusCodes.UNAUTHORIZED, "Authorization Error");
  }
};
