import { ErrorLoginRequired } from "@/components/errors/error-login-required";
import { UserList } from "@/components/users/user-list";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function UsersPage() {
  const session = await getServerAuthSession();

  if (!session) return <ErrorLoginRequired />;

  const users = await api.user.all.query();

  return (
    <div className="container mt-4 md:my-auto md:max-w-screen-md">
      <p className="mb-4 text-sm">
        Find some new friends? Invite them to your project!
      </p>

      <div className="flex flex-col gap-2">
        <UserList users={users} />
      </div>
    </div>
  );
}
