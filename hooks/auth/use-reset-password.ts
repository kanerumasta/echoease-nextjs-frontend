"use client";

import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordSchema = z.object({
    email: z.string().email(),
});



export default function useResetPassword() {
    const [resetPassword,{isLoading}] = useResetPasswordMutation();
    const form = useForm<z.infer<typeof ResetPasswordSchema>>();

    const onSubmit = form.handleSubmit((data: z.infer<typeof ResetPasswordSchema>) => {
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
        form,
        isLoading,
        onSubmit,
    };
}
