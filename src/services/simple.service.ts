import { PrismaClient } from "@prisma/client";
import { Prisma } from "../database/prisma-instance";

export abstract class SimpleService {
    protected _dbInstance: PrismaClient;

    constructor(dbInstance: PrismaClient) {
        this._dbInstance = dbInstance || Prisma.instance;
    }
}

