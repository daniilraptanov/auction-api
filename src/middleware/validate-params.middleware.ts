import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../tools/response-handler.tools";


// TODO :: use type for schema
export const validateParams = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      next();
    }

    if (!error) {
      return;
    }

    if (!error.details[0].context.key) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, "An error occurred.");
    }
    return sendResponse(res, StatusCodes.BAD_REQUEST, error.details[0].message);
  };
};
