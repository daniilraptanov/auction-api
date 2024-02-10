import { Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const sendResponse = (
  res: Response,
  status: StatusCodes,
  message: string = "",
  data: any = null
) => {
  return res.status(status).json({
    message: message || getReasonPhrase(status),
    data,
  });
};

export const sendStatusResponse = (
  res: Response,
  status: StatusCodes,
  message: string = "",
  dataStatus: boolean
) => {
  return sendResponse(res, status, message, { status: dataStatus });
}
