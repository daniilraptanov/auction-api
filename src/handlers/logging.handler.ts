import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "./response.handler";

export const logger = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

            const result = await originalMethod.call(this, req, res, next);

            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`);
            return result;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${error.message}`);
            return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    };

    return descriptor;
}