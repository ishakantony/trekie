import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: "Project tracking made easy, seriously!",
}

export default function Home() {
  return (
    <main>
      <Image
        src={"/loading.gif"}
        alt={"Loading Gif"}
        width={150}
        height={150}
      />
      <h1 className="text-8xl leading-normal">Trekie</h1>
      <p className="text-center text-lg md:w-[700px]">
        <span className="font-medium underline underline-offset-4">
          Project tracking made easy
        </span>
        . You can use this app for{" "}
        <span className="font-medium underline underline-offset-4">free</span>.
        <br className="hidden md:block" /> We mainly created this project for
        people (you and me) to learn :D!
      </p>
    </main>
  );
}
