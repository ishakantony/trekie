import { api } from "@/trpc/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Projects() {
  const projects = await api.project.all.query();

  return (
    <div className="container mt-4 md:max-w-screen-md md:my-auto">
      <p className="text-sm mb-4">
        Cannot see your project here? Maybe you don&apos;t have one. Let&apos;s{" "}
        <Link className="underline underline-offset-4" href="/projects/new">create new!</Link>
      </p>

      <div className="flex flex-col gap-2">
      {projects.map((project) => (
        <Card className="p-2 flex items-center justify-between" key={project.id}>
          <span className="text-sm font-semibold">{project.name}</span>
          <Link href={`/projects/${project.slug}`}>
          <Button>View</Button>
          </Link>
        </Card>
      ))}
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
