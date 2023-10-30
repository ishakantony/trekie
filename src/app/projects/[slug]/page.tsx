import DeleteProject from "@/components/project/delete-project";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";


export default async function Project({ params }: { params: { slug: string } }) {
  const project = await api.project.one.query({ slug: params.slug });

  return (
    <div className="container md:max-w-screen-md md:my-auto">
      <Card className="flex items-center justify-between text-sm p-3">
        <div className="text-md font-bold">{project?.name}</div>
        <DeleteProject id={params.slug}  />
      </Card>
    </div>
  );
}
    