"use client";
import { useResetPassword } from "@/hooks/auth";
import { Spinner } from "@/components/common";
import FormField from "./FormField";

export default function PasswordResetForm() {
    const { register, onSubmit, isLoading } = useResetPassword();

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <FormField label="Email" register={register} name="email" />
            <button disabled={isLoading} type="submit">
                {isLoading ? <Spinner /> : "Continue"}
            </button>
        </form>
    );
}
