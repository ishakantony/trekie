import { api } from "@/trpc/server";
import { AssignedProjects } from "@/components/assigned-projects";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../../../components/ui/card";
import { ErrorNotFound } from "@/components/errors/error-not-found";

export default async function UserDetails({
  params,
}: {
  params: { userId: string };
}) {
  const thisUser = await api.user.one.query(params);

  if (!thisUser) {
    return <ErrorNotFound></ErrorNotFound>;
  }

  const projectsAssignedToThisUser =
    await api.user.project.assigned.query(params);

  return (
    <div className="flex flex-col p-4 md:container">
      <div>
        <Card className="mx-auto mb-2 flex p-2 md:max-w-[500px]">
          <div className="justify-left flex">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={thisUser.image ?? ""}
                alt={thisUser.name ?? "No name"}
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="my-2 ml-2 flex md:col-span-3">
            <div className="flex-col">
              <p className="text-left text-sm text-xl font-semibold">
                {thisUser?.name}
              </p>
              <p className="text-left text-xs text-slate-400 hover:text-sky-400">
                {thisUser?.email}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Project List */}
      <div className="mx-auto md:mt-4 md:max-w-[500px]">
        <div className="mb-4 flex flex-col gap-2">
          <AssignedProjects
            projects={projectsAssignedToThisUser}
            userId={params.userId}
          />
        </div>
        <p className="text-center text-sm">
          Do you want to invite {thisUser?.name} to the project ? Let&apos;s
          assign he/she{" "}
          <Link
            className="underline underline-offset-4"
            href={`/users/${params.userId}/invite-to-project`}
          >
            here!
          </Link>
        </p>
      </div>
    </div>
  );
}
