import {
    useLoginUserMutation,

} from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type TLoginSchema = z.infer<typeof LoginSchema>;

export default  function useLogin() {
    const router = useRouter();

    const { register, handleSubmit } = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
    });

    const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

    const onSubmit = handleSubmit((data: TLoginSchema) => {
        const validatedData = LoginSchema.safeParse(data);
        if (!validatedData.success) {
            toast.error("Invalid Data Passed");
            return;
        }
        loginUser(validatedData.data)
            .unwrap()
            .then(() => {
                toast.success(`Logged in as ${validatedData.data.email}`);
                router.replace("/dashboard");
            })
            .catch(() => {
                toast.error("Email or password is incorrect");
            });
    });

    return  {
        register,
        onSubmit,
        isLoading,
        isSuccess,
    };
}