"use client";

import { headerRightItems } from "@/config/header";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderRight = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold uppercase tracking-widest"
      >
        <Image
          src={"/loading.gif"}
          alt={"Trekie logo"}
          width={25}
          height={25}
        />
        <span className="hidden md:block">Trekie</span>
      </Link>

      {headerRightItems.map((item) => (
        <Link key={item.name} href={item.path}>
          <span
            className={cn(
              "text-sm",
              pathname === item.path ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};
