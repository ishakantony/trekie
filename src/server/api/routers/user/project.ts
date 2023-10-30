import {
  projects,
  projectsAssignments,
  users,
  type SelectProject,
  type SelectUser,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const userProjectRouter = createTRPCRouter({
  assign: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Project must exist
      const project = await ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.projectId),
      });

      if (!project) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid project for assignment",
        });
      }

      // User must exist
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid user for assignment",
        });
      }

      // If project already assigned to user, respond OK
      const projectAssignment =
        await ctx.db.query.projectsAssignments.findFirst({
          where: and(
            eq(projectsAssignments.projectId, project.id),
            eq(projectsAssignments.userId, user.id),
          ),
        });

      if (projectAssignment) {
        // Project already assigned to user
        return {
          message: successfulAssignmentMessage(project, user),
        };
      } else {
        // Project not yet assigned to user, do the assignment

        await ctx.db.insert(projectsAssignments).values({
          projectId: project.id,
          userId: user.id,
        });

        return {
          message: successfulAssignmentMessage(project, user),
        };
      }
    }),
});

const successfulAssignmentMessage = (
  project: SelectProject,
  user: SelectUser,
): string => {
  return `Project [${project.name}] has been assigned to user [${user.name}]`;
};
