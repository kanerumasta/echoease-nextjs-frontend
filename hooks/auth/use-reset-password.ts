"use client";

import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ResetPasswordSchema = z.object({
    email: z.string().email(),
});

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export default function useResetPassword() {
    const [resetPassword,{isLoading}] = useResetPasswordMutation();
    const { register, handleSubmit } = useForm<TResetPasswordSchema>();

    const onSubmit = handleSubmit((data: TResetPasswordSchema) => {
        const validatedData = ResetPasswordSchema.safeParse(data);
        if (!validatedData.success) {
            toast.error("Email is not valid");
            return;
        }
        resetPassword(validatedData.data.email)
            .unwrap()
            .then(() => {
                toast.success('Please check your email to reset your password')
            })
            .catch(() => toast.error("Cant reset password as of now.."));
    });

    return {
        register,
        isLoading,
        onSubmit,
    };
}
