"use client";

import { useRegister } from "@/hooks/auth";
import { Spinner } from "@/components/common";
import FormField from "./FormField";

export default function RegisterForm() {
    const { onSubmit, register, isLoading } = useRegister();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormField
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
                label="Password"
                name="password"
                register={register}
                key="password"
            />
            <FormField
                label="Confirm Password"
                name="re_password"
                register={register}
                key="cpassword"
            />
            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isLoading ? <Spinner sm /> : "Sign up"}
                </button>
            </div>
        </form>
    );
}
