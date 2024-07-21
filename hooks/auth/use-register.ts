import { useRegisterNewUserMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const SignupSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    re_password: z.string(),
});

type TSignupSchema = z.infer<typeof SignupSchema>;

export default function useRegister() {
    const router = useRouter();

    const { register, handleSubmit } = useForm<TSignupSchema>({
        resolver: zodResolver(SignupSchema),
    });

    const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();

    const onSubmit = handleSubmit((data: TSignupSchema) => {
        const validatedData = SignupSchema.safeParse(data);
        if (!validatedData.success) {
            toast.error("Invalid Data Passed");
            return;
        }
        registerNewUser(validatedData.data)
            .unwrap()
            .then(() => {
                toast.success("Please check you email for activation.");
                router.replace("/auth/login");
            })
            .catch();
    });

    return {
        register,
        isLoading,
        onSubmit,
    };
}
