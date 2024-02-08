import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../configs/config";
import { sendResponse } from "../tools/response-handler.tools";

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

    const decoded = jwt.verify(token, config.jwtSecretKey);
    req["user"] = decoded;
    next();
  } catch {
    sendResponse(res, StatusCodes.UNAUTHORIZED, "Authorization Error");
  }
};
