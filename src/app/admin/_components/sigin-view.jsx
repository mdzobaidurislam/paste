"use client";
import { useSearchParams } from "next/navigation";
import UserAuthForm from "./user-auth-form";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function SignInViewPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: decodeURIComponent(error),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error, toast]);
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 bg-[#18181b]">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin login
            </h1>
          </div>
          {error && (
            <div className="text-red-600 mb-4">
              {decodeURIComponent(error)}{" "}
              {/* Decodes and displays the error message */}
            </div>
          )}
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
