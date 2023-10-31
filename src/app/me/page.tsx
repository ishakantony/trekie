import { ErrorLoginRequired } from "@/components/errors/error-login-required";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";

export default async function MePage() {
  const session = await getServerAuthSession();

  if (!session) return <ErrorLoginRequired />;

  const projectsCreatedByMe = await api.me.project.createdByMe.query();

  const projectsAssignedToMe = await api.me.project.assignedToMe.query();

  const { user } = session;

  return (
    <main className="flex flex-col items-center gap-4 p-4 md:container">
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Hi {user.name ?? "there"}!</AlertTitle>
        <AlertDescription className="text-gray-500">
          This is where you can get insights about your Trekie account.
        </AlertDescription>
      </Alert>

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <Card
          id="profile-information"
          className="flex h-[200px] w-full flex-col items-center justify-between p-4"
        >
          <div className="flex h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-gray-700">
            <Image
              className="aspect-square"
              src={user.image ?? ""}
              alt={user.name ?? "No name"}
              width={500}
              height={500}
            />
          </div>

          <span className="border-b-4 font-semibold">{user.name}</span>
        </Card>

        <Card
          id="projects-created"
          className="flex h-[200px] w-full flex-col items-center justify-between p-4"
        >
          <span className="my-auto text-8xl">{projectsCreatedByMe.length}</span>
          <p className="mt-2 text-sm uppercase text-gray-500">
            Projects Created
          </p>
        </Card>

        <Card
          id="projects-assigned"
          className="flex h-[200px] w-full flex-col items-center justify-between p-4"
        >
          <span className="my-auto text-8xl">
            {projectsAssignedToMe.length}
          </span>
          <p className="mt-2 text-sm uppercase text-gray-500">
            Projects Assigned
          </p>
        </Card>
      </div>
    </main>
  );
}
