"use client";
import { useLogin } from "@/hooks/auth";
import { Spinner } from "@/components/common";
import FormField from "./FormField";
import { SocialButtons } from "../../utils";
import { ROUTES } from "@/conf";

export default function LoginForm() {
  const { onSubmit, register, isLoading, isSuccess } = useLogin();

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField register={register} label="Email" name="email" />
        <FormField
          register={register}
          type="password"
          label="Password"
          name="password"
          link={{
            href: ROUTES.auth.resetPassword,
            label: "Forgot Password?",
          }}
        />

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? <Spinner sm /> : "Sign in"}
          </button>
        </div>
      </form>
      <SocialButtons />
    </>
  );
}
