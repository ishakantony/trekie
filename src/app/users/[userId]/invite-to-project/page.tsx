import { api } from "@/trpc/server";
import { AssignProject } from "@/components/assign-project";

export default async function InviteToProject({ params }: { params: { userId: string } }) {
  const projects = await api.project.all.query();
  return (
    <div className="container mt-4 md:my-auto md:max-w-screen-md">
      <p className="mb-4 text-sm">Select a project below to invite this user!</p>

      <div className="flex flex-col gap-2">
        <AssignProject projects={projects} userId={params.userId} />
      </div>

    </div>

  );
}
