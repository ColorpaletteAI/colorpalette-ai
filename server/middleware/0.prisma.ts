import { PrismaClient } from "@prisma/client";
import { db } from "~~/lib/db";

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
  }
}

export default eventHandler((event) => {
  event.context.prisma = db;
});
