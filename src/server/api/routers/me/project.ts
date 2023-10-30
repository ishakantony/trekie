import { projects, projectsAssignments } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const meProjectRouter = createTRPCRouter({
  createdByMe: protectedProcedure.query(({ ctx }) => {
    const { db, session } = ctx;

    return db.query.projects.findMany({
      where: eq(projects.createdByUserId, session.user.id),
    });
  }),

  assignedToMe: protectedProcedure.query(({ ctx }) => {
    const { db, session } = ctx;

    return db
      .select()
      .from(projects)
      .innerJoin(
        projectsAssignments,
        eq(projects.id, projectsAssignments.projectId),
      )
      .where(eq(projectsAssignments.userId, session.user.id));
  }),

  delete: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const project = await db.query.projects.findFirst({
        where: eq(projects.createdByUserId, session.user.id),
      });

      // Only person that creates can delete the project
      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to delete this project",
        });
      }

      // TODO - Delete assignments

      await db.delete(projects).where(eq(projects.id, input.projectId));
    }),

  exit: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      await db
        .delete(projectsAssignments)
        .where(
          and(
            eq(projectsAssignments.projectId, input.projectId),
            eq(projectsAssignments.userId, session.user.id),
          ),
        );
    }),
});
