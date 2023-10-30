import { CardProjects } from "@/components/card-projects";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Projects() {
  const projects = await api.project.all.query();

  return (
    <div className="container mt-4 md:my-auto md:max-w-screen-md">
      <p className="mb-4 text-sm">
        Cannot see your project here? Maybe you don&apos;t have one. Let&apos;s{" "}
        <Link className="underline underline-offset-4" href="/projects/new">
          create new!
        </Link>
      </p>

      <div className="flex flex-col gap-2">
        <CardProjects projects={projects} />
      </div>
    </div>
  );
}

// buat ani belajar
// "use client"
// import { api } from "@/trpc/react"
// export default function Project(){
//     const { data } = api.project.all.useQuery()
//     return <h1>ANI ANi {JSON.stringify(data)}</h1>
// }
