import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 md:p-24">
      <Image
        src={"/loading.gif"}
        alt={"Loading Gif"}
        width={150}
        height={150}
      />
      <h1 className="text-8xl leading-normal">Trekie</h1>
      <p className="md:w-[700px] text-lg text-center">
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
