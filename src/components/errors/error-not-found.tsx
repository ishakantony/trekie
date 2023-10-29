"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const ErrorNotFound = () => {
  const router = useRouter();

  return (
    <main className="my-auto flex flex-col items-center justify-center p-4">
      <Card className="w-full p-4 md:w-[500px]">
        <p className="uppercase">Error: 404</p>
        <h1 className="mt-2 text-3xl font-semibold leading-none">Not Found</h1>
        <p className="my-6 text-sm">
          The page that you are looking for does not exist.
        </p>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Card>
    </main>
  );
};
