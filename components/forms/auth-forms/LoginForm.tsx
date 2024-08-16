"use client";
import { Spinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SocialButtons } from "@/components/utils";
import { ROUTES } from "@/conf";
import { useLogin } from "@/hooks/auth";
import { useIsArtistQuery } from "@/redux/features/authApiSlice";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const { form, isLoading, onSubmit, isError, isSuccess, error } = useLogin();
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Logged in successfully`);
      setTimeout(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/me/is-artist`, {
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              window.location.href = ROUTES.echoVerse;
            } else {
              window.location.href = ROUTES.echoHunt;
            }
          })
          .catch(() => {
            window.location.href = ROUTES.echoHunt;
          });
      }, 1000);
    }
  }, [isSuccess, isError]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 ">
        <SocialButtons />
        <div className="flex w-full my-4 items-center">
          <Separator className="flex-1" />
          <span className="mx-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <Separator className="flex-1" />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Type email here" {...field} />
              </FormControl>
              {form.formState.errors.email && (
                <FormDescription className="text-red-400">
                  {form.formState.errors.email.message}
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type password here"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormDescription className="text-red-400">
                  {form.formState.errors.password.message}
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <Button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 my-8 text-sm font-semibold leading-6 text-white uppercase tracking-wider shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          {isLoading ? <Spinner sm /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
