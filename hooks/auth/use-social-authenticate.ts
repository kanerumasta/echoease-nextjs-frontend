import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function useSocialAuth(provider: string) {
    const refRan = useRef(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [socialAuthenticate] = useSocialAuthenticateMutation();

    useEffect(() => {
        const state = searchParams.get("state");
        const code = searchParams.get("code");

        if (state && code && !refRan.current) {
            socialAuthenticate({ provider, state, code })
                .unwrap()
                .then(() => {
                    router.push("/dashboard");
                    toast.success(`Log in with ${provider} sucessful`);
                })
                .catch(() => {
                    router.push("/auth/login");
                    toast.error("Something went wrong");
                });
        }
        return () => {
            refRan.current = true;
        };
    }, [provider]);
}
