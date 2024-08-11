"use client";

import { Spinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConfirmPasswordReset } from "@/hooks/auth";

export default function ConfirmPasswordReset() {
  const { form, onSubmit, isLoading } = useConfirmPasswordReset();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="re_new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? <Spinner sm /> : "Submit"}</Button>
        {/* <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    New Password
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        {...register("new_password")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Confirm New Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        {...register("re_new_password")}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <button disabled={isLoading} type="submit">
                
            </button> */}
      </form>
    </Form>
  );
}
