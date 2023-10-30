import { CardProjects } from "@/components/card-projects";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";

export default async function MePage() {
  const session = await getServerAuthSession();

  const myProjects = await api.me.project.createdByMe.query();

  const { user } = session!;

  return (
    <main className="grow">
      <div id="profile-picture-background" className="h-[150px] w-full">
        <Image
          className="h-full w-full object-cover"
          src="https://picsum.photos/seed/mountain/1600/300"
          alt="profile background"
          width={1600}
          height={300}
        />
      </div>
      <div id="profile-content" className="md:container">
        <div
          id="profile-picture"
          className="relative flex items-center justify-center md:justify-start"
        >
          <div className="absolute flex h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-white md:h-36 md:w-36">
            <Image
              className="aspect-square"
              src={user.image ?? ""}
              alt={user.name ?? "No name"}
              width={500}
              height={500}
            />
          </div>
        </div>
        <div
          id="personal-information"
          className="container mt-32 flex flex-col gap-4 md:mt-28"
        >
          <h2 className="text-sm">
            Hey {user.name}, you have created these project(s)
          </h2>
          <div className="flex flex-col gap-2">
            <CardProjects projects={myProjects} />
          </div>
        </div>
      </div>
    </main>
  );
}
