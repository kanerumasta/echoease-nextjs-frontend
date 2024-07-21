import { z } from "zod";

export const SignupSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    re_password: z.string(),
});

export const ResetPasswordConfirmSchema = z.object({
    uid: z.string(),
    token: z.string(),
    new_password: z.string(),
    re_new_password: z.string(),
});

export type TSignupSchema = z.infer<typeof SignupSchema>;
export type TResetPasswordConfirmSchema = z.infer<
    typeof ResetPasswordConfirmSchema
>;
