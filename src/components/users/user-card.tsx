import { type User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const UserCard = ({ user }: { user: User }) => {
  const name = user.name ?? "NO NAME";
  const image =
    user.image ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name,
    )}`;

  const emailSubject = encodeURIComponent(
    `Hi ${user.name}, come join my project on Trekie!`,
  );

  return (
    <Card className="flex items-center justify-between p-4" key={user.id}>
      <div id="user-card-left" className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Image src={image} width={500} height={500} alt={name} />
        </div>
        <span className="text-sm font-semibold">{name}</span>
      </div>
      <div id="user-card-right">
        <Link href={`/users/${user.id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </Card>
  );
};
