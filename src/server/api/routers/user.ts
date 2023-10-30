import { createTRPCRouter, protectedProcedure } from "../trpc";
import { userProjectRouter } from "./user/project";

export const userRouter = createTRPCRouter({
  project: userProjectRouter,

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
});
