import { ROUTES } from "@/conf";
import { useLoginUserMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ message: "Email is a required field" })
    .email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Password is a required field" }),
});

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const onSubmit = form.handleSubmit((data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);
    if (!validatedData.success) {
      toast.error("Invalid Data Passed");
      return;
    }
    loginUser(validatedData.data)
      .unwrap()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return {
    form,
    onSubmit,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
