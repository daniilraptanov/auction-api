import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";
import { ApiRequest } from "../handlers/request.handler";
import { sendResponse } from "../handlers/response.handler";

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = { ...req.body, ...req.query, ...req.params }
    const { error } = schema.validate(params);

    if (!error) {
      ApiRequest.setValidatedParams(req, params);
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
