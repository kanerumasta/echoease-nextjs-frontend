import { useRegisterNewUserMutation } from "@/redux/features/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignupSchema = z
  .object({
    first_name: z.string({message:"First name is required."}),
    last_name: z.string({message:"Last name is required."}),
    email: z.string().email({message:"Invalid email"}),
    password: z.string({message:"Password is required."}),
    re_password: z.string({message:"Confirm password is required."}),
  })
  .refine((values) => values.password === values.re_password, {
    message: "Passwords should match.",
  });

export default function useRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  const [registerNewUser, { isLoading, isSuccess, isError, error }] =
    useRegisterNewUserMutation();

  const onSubmit = form.handleSubmit((data: z.infer<typeof SignupSchema>) => {
    const validatedData = SignupSchema.safeParse(data);
    if (!validatedData.success) {
      toast.error("Invalid Data Passed");
      return;
    }
    registerNewUser(validatedData.data)
      .unwrap()
      .then(() => {})
      .catch();
  });

  return {
    form,
    isLoading,
    onSubmit,
    isSuccess,
    isError,
    error
  };
}
