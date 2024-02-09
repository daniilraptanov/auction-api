import { PrismaClient } from "@prisma/client";
import { Config } from "../config";

export class Prisma {
  private static _instance: PrismaClient;

  private constructor() {}

  static get instance() {
    if (Config.isProduction) {
      return new PrismaClient();
    }

    if (!Prisma._instance) {
      Prisma._instance = new PrismaClient();
    }
    return Prisma._instance;
  }
}
