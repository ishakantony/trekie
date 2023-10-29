import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "../ui/icons";

export const Footer = () => (
  <footer className="mt-auto pb-4">
    <div className="container flex h-16 flex-wrap items-center justify-center md:flex-nowrap [&>*]:mr-4">
      <span className="flex basis-full items-center justify-center md:basis-auto">
        Proudly built with <Icons.love className="mx-1" /> by{" "}
      </span>
      {siteConfig.authors.map((author) => (
        <Link
          className="flex items-center font-medium text-muted-foreground underline underline-offset-4"
          key={author.name}
          href={author.github}
          target="_blank"
          rel="noreferrer"
        >
          <Icons.github height={15} width={15} className="mr-2" /> {author.name}
        </Link>
      ))}
    </div>
  </footer>
);
