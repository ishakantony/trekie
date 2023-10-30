"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Icons } from "../ui/icons";
// import { useRouter } from 'next/router';

export default function DeleteProject({ id }: {id:string}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteProject = api.project.delete.useMutation({
    onError: () => {
      toast({
        title:
          "Something went wrong, please try again. If issue persist, please contact support.",
      });
    },
    onSuccess: () => {
      router.push("/projects");
      toast({
        title:
          "Project deleted!",
      });
    },
  });


  function handleDelete() {
    deleteProject.mutate({ slug: id })
  }

  return (
    <>
      <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleOpen()}>Delete Project</Button>
      <div className={`fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden outline-none  ${open? "block" : "hidden"}`}>
        <div className="relative w-full justify-center flex">
          <div className="relative rounded-lg flex flex-col justify-start pt-9">
            <div className="bg-white border rounded-lg  shadow-lg">
                <div className="flex items-start justify-between p-4 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Delete Project
                    </h3>
                
                  <Icons.close height={25} width={25} className="mr-2 cursor-pointer" onClick={() => handleClose()}/>
                
                </div>
                <div className="p-6 space-y-6">
                    <p>
                        This action cannot be undone. Are you sure you want to <b>delete</b> this project?
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete()}>Delete Project</Button>
              </div>
              </div>
            </div>
        </div>
      </div>
    </>
    
  );
}
    