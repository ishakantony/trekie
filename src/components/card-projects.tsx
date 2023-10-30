"use client";

import { toast } from "@/hooks/use-toast";
import { type SelectProject } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const CardProjects = ({
  projects,
}: {
  projects: Array<SelectProject>;
}) => {
  const router = useRouter();

  const deleteProject = api.me.project.delete.useMutation({
    onError: () => {
      toast({
        title:
          "Something went wrong, please try again. If issue persist, please contact support.",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Project deleted",
      });
    },
  });

  function onClick(projectId: string): void {
    deleteProject.mutate({ projectId });
  }

  return projects.map((project) => (
    <Card className="flex items-center justify-between p-2" key={project.id}>
      <span className="text-sm font-semibold">{project.name}</span>
      <div id="actions" className="flex gap-2">
        <Link href={`/projects/${project.slug}`}>
          <Button>View</Button>
        </Link>
        <Button variant="destructive" onClick={() => onClick(project.id)}>
          Delete
        </Button>
      </div>
    </Card>
  ));
};
