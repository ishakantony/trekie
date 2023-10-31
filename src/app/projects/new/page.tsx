import { ErrorLoginRequired } from "@/components/errors/error-login-required";
import { NewProject } from "@/components/projects/new/new-project";
import { getServerAuthSession } from "@/server/auth";

export default async function NewProjectPage() {
  const session = await getServerAuthSession();

  if (!session) return <ErrorLoginRequired />;

  return <NewProject />;
}
