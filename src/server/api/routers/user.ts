import { users } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { userProjectRouter } from "./user/project";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  project: userProjectRouter,

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
  one: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, input.userId),
    });
  }),
});
