"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const ErrorNoPermission = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full p-4 md:w-[500px]">
        <p className="uppercase">Error: 403</p>
        <h1 className="mt-2 text-3xl font-semibold leading-none">Forbidden</h1>
        <p className="my-6 text-sm">
          You don&apos;t have permission to access.
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
