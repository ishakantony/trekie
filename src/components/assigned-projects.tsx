"use client";

import { toast } from "@/hooks/use-toast";
import { type SelectProject } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const AssignedProjects = ({
  projects, userId
}: {
  projects: Array<SelectProject>;
  userId: string
}) => {
  const router = useRouter();

  const removeUserFromProject = api.user.project.remove.useMutation({
    onError: (error) => {
      let errorMessage;

      if (error.data?.httpStatus === 403) {
        errorMessage = error.message;
      } else {
        errorMessage =
          "Something went wrong, please try again. If issue persist, please contact support.";
      }

      toast({
        title: errorMessage,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "User successfully removed from the project",
      });
    },
  });

  function onRemove(projectId: string): void {
    removeUserFromProject.mutate({ projectId , userId});
  }

  return projects.map((project) => (
    <Card className="flex items-center justify-between p-2" key={project.id}>
      <span className="text-sm font-semibold">{project.name}</span>
      <div id="actions" className="flex gap-2">
        {/* buat card baru aja nih */}
        <Button variant="destructive" onClick={() => onRemove(project.id)}>
          Remove
        </Button>
      </div>
    </Card>
  ));
};
