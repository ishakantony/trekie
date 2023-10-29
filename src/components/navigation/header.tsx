import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <p className="flex items-center gap-2 font-bold uppercase tracking-widest">
          <Image
            src={"/loading.gif"}
            alt={"Trekie logo"}
            width={25}
            height={25}
          />
          Trekie
        </p>
        <div>
          {!session ? (
            <Link href="/api/auth/signin">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                className="aspect-square"
                src={session.user.image ?? ""}
                alt={session.user.name ?? "No name"}
                width={100}
                height={100}
              />
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
