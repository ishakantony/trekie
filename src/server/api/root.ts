import { createTRPCRouter } from "@/server/api/trpc";
import { meRouter } from "./routers/me";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  user: userRouter,
  me: meRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
