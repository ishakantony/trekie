import { type SelectUser } from "@/server/db/schema";
import Link from "next/link";
import { Card } from "./ui/card";

export const CardUsers = ({ users }: { users: Array<SelectUser> }) => {
  return users.map((user) => (
    <Card className="flex items-center p-4" key={user.id}>
      <span className="text-sm font-semibold">{user.name}</span>
      <span className="mx-2">@</span>
      <Link
        className="underline underline-offset-4"
        href={`mailto:${user.email}`}
      >
        {user.email}
      </Link>
    </Card>
  ));
};
