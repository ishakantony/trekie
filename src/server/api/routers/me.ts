import { createTRPCRouter } from "../trpc";
import { meProjectRouter } from "./me/project";

export const meRouter = createTRPCRouter({
  project: meProjectRouter,
});
