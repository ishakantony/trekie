import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const ErrorLoginRequired = () => {
  return (
    <main className="my-auto flex flex-col items-center justify-center p-4">
      <Card className="w-full p-4 md:w-[500px]">
        <p className="uppercase">Error: 401</p>
        <h1 className="mt-2 text-3xl font-semibold leading-none">
          Unauthorized
        </h1>
        <p className="my-6 text-sm">
          You don&apos;t have permission to access, please login to continue.
        </p>
        <Link href="/api/auth/signin">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </Link>
      </Card>
    </main>
  );
};
