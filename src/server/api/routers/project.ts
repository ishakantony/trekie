import { projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// Function to generate a random alphanumeric string of a given length
function generateRandomSlug(length: number) {
  const alphanumericChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    slug += alphanumericChars[randomIndex];
  }
  return slug;
}

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

      let slug;

      if (projectName.length <= 10) {
        // Generate a random slug for project names less than or equal to 10 characters
        slug = generateRandomSlug(4);
      } else {
        // Take the first 5 characters of projectName and add a "-" followed by 4 random alphanumeric characters
        const truncatedName = projectName.substring(0, 5);
        const randomPart = generateRandomSlug(4);
        slug = `${truncatedName}-${randomPart}`;
      }

      await ctx.db.insert(projects).values({
        id,
        name: projectName,
        slug,
        createdByUserId: ctx.session.user.id,
      });
    }),
});
