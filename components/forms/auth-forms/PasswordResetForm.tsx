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
import { useResetPassword } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function PasswordResetForm() {
  const { form, onSubmit, isLoading } = useResetPassword();
  const router = useRouter()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <div className={cn("flex items-center")}>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Send Email"}
        </Button>
        <p className="text-sm text-gray-400 text-center hover:text-blue-500 duration-200  hover:cursor-pointer" onClick={()=>router.back()}>Back</p>
      </form>
    </Form>
  );
}
