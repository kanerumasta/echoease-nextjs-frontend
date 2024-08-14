"use client";

import { useRegister } from "@/hooks/auth";
import { Spinner } from "@/components/common";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialButtons } from "@/components/utils";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const { onSubmit, form, isLoading, isSuccess, isError } = useRegister();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Please check you email for activation.");
      router.replace("/auth/login");
    }
    if (isError) {
      toast.error("Please complete the required fields.");
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
        <div className="flex">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type first name here" {...field} />
                </FormControl>
                {form.formState.errors.first_name && (
                  <FormDescription className="text-red-400">
                    {form.formState.errors.first_name.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Separator className="bg-transparent w-2" />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type last name here" {...field} />
                </FormControl>
                {form.formState.errors.last_name && (
                  <FormDescription className="text-red-400">
                    {form.formState.errors.last_name.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
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
                  placeholder="Type password here"
                  type="password"
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
        <FormField
          control={form.control}
          name="re_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.re_password && (
                <FormDescription className="text-red-400">
                  {form.formState.errors.re_password.message}
                </FormDescription>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner sm /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
