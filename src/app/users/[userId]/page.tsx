import { api } from "@/trpc/server";
import { AssignedProjects } from "@/components/assigned-projects";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default async function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  const projectsAssignedToThisUser =
    await api.user.project.assigned.query(params);

  return (
    <div className="container mt-4 md:my-auto md:max-w-screen-md">
      <p className="mb-4 text-sm">
        Heyoo! This is user details page! Find below for project(s) that
        assigned to the user!
      </p>
      <p className="mb-4 text-sm">
        Do you want to invite this user to the project ? Let&apos;s assign them{" "}
        <Link
          className="underline underline-offset-4"
          href={`/users/${params.userId}/invite-to-project`}
        >
          here!
        </Link>
      </p>
      <div className="flex flex-col gap-2">
        <AssignedProjects
          projects={projectsAssignedToThisUser}
          userId={params.userId}
        />
      </div>
    </div>
  );
}
