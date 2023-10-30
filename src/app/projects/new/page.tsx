"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProjectFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Project name must be at least 1 character.",
    })
    .max(20, {
      message: "Project name cannot be more than 20 characters.",
    }),
});

type NewProjectFormValues = z.infer<typeof newProjectFormSchema>;

export default function NewProject() {
  const router = useRouter();

  const createProject = api.project.create.useMutation({
    onError: (error) => {
      let message =
        "Something went wrong, please try again. If issue persist, please contact support.";

      if (error.data?.httpStatus === 400) {
        message = error.message;
      }

      toast({
        title: message,
      });
    },
    onSuccess: () => {
      router.push("/projects");
      toast({
        title: "New project created",
      });
    },
  });

  const form = useForm<NewProjectFormValues>({
    resolver: zodResolver(newProjectFormSchema),
    mode: "onChange",
  });

  function onSubmit(data: NewProjectFormValues) {
    createProject.mutate(data);
  }

  return (
    <div className="container my-auto md:w-3/4 lg:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Trekie" {...field} />
                </FormControl>
                <FormDescription>
                  This is your project name, you can use this to group your team
                  members
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create project</Button>
        </form>
      </Form>
    </div>
  );
}
