"use client";

import { useRegister } from "@/hooks/auth";
import { Spinner } from "@/components/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const { onSubmit, form, isLoading } = useRegister();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
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
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? <Spinner sm /> : "Sign up"}
        </Button>
        {/* <FormField
                label="First Name"
                name="first_name"
                register={register}
                key="fname"
            />
            <FormField
                label="Last Name"
                name="last_name"
                register={register}
                key="lname"
            />
            <FormField
                label="Email"
                name="email"
                register={register}
                key="email"
            />
            <FormField
                type="password"
                label="Password"
                name="password"
                register={register}
                key="password"
            />
            <FormField
                type="password"
                label="Confirm Password"
                name="re_password"
                register={register}
                key="cpassword"
            /> */}
        {/* <div>
                <button
                    
                >
                    
                </button>
            </div> */}
      </form>
    </Form>
  );
}
