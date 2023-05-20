/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const enforceUserAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }
  return next({
    ctx: {
      prisma: ctx.prisma,
      user: ctx.user,
    }
  });
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(enforceUserAuth);

export const router = t.router;
export const middleware = t.middleware;
