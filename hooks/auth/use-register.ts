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



export default function useRegister() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    });

    const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();

    const onSubmit = form.handleSubmit((data: z.infer<typeof SignupSchema>) => {
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
        form,
        isLoading,
        onSubmit,
    };
}
