"use client";
import { useResetPassword } from "@/hooks/auth";
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

export default function PasswordResetForm() {
  const { form, onSubmit, isLoading } = useResetPassword();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
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
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
