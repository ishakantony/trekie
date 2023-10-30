import { projects } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany();
  }),

  one: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.slug, input.slug),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = nanoid();
      const projectName = input.name;
      const slug = projectName.toLowerCase().replace(/\s+/g, "-");

      // Every project must have unique slug
      const project = await ctx.db.query.projects.findFirst({
        where: eq(projects.slug, slug),
      });

      if (project) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please choose a different name for your project.",
        });
      }

      await ctx.db.insert(projects).values({
        id,
        name: projectName,
        slug,
        createdByUserId: ctx.session.user.id,
      });
    }),
});
