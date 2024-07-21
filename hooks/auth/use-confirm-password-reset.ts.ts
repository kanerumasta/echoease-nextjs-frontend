"use client";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const ResetPasswordSchema = z.object({
    new_password: z.string(),
    re_new_password: z.string(),

});

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export default function useConfirmPasswordReset() {
    const params = useParams<{ uid: string; token: string }>();
    const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation();
    const { register, handleSubmit } = useForm<TResetPasswordSchema>();
    const router = useRouter();

    const onSubmit = handleSubmit((data: TResetPasswordSchema) => {
        const validatedData = ResetPasswordSchema.safeParse(data);
        const token = params.token;
        const uid = params.uid;

        if (validatedData.success) {
            const new_password = validatedData.data.new_password;
            const re_new_password = validatedData.data.re_new_password;

            resetPasswordConfirm({ new_password, re_new_password, uid, token })
                .unwrap()
                .then(() => {
                    toast.success("Your password is changed");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    router.replace("/auth/login");
                });
        } else {
            toast.error("Invalid Data");
        }
    });

    return {
        register,
        isLoading,
        onSubmit,
    };
}
