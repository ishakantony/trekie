import { LogOut } from "lucide-react";
import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const HeaderLeft = ({ session }: { session: Session | null }) => {
  return (
    <div>
      {!session ? (
        <Link href="/api/auth/signin">
          <Button variant="outline">Login</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                className="aspect-square"
                src={session.user.image ?? ""}
                alt={session.user.name ?? "No name"}
                width={100}
                height={100}
              />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Link className="flex items-center" href="/api/auth/signout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
