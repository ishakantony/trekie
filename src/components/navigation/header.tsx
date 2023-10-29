import { type Session } from "next-auth";
import { HeaderLeft } from "./header-left";
import { HeaderRight } from "./header-right";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <HeaderRight />
        <HeaderLeft session={session} />
      </div>
    </header>
  );
};
