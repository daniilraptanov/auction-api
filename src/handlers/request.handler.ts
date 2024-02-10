import { Request } from "express";
import { IAuctionModel } from "../types/auction.type";
import { IUserDTO } from "../types/dto/user.dto";

export class ApiRequest {
    static getUserDTO(req: Request): IUserDTO {
        return req["userDTO"];
    }

    static setUserDTO(req: Request, userDTO: IUserDTO) {
        req["userDTO"] = userDTO;
    }

    static getValidatedParams(req: Request) {
        return req["validatedParams"];
    }

    static setValidatedParams(req: Request, params) {
        req["validatedParams"] = params;
    }

    static getAuction(req: Request): IAuctionModel {
        return req["auction"];
    }

    static setAuction(req: Request, auction: IAuctionModel) {
        req["auction"] = auction;
    }
}
