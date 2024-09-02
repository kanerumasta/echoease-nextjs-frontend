import { ROUTES } from "@/conf";
import { useSocialAuthenticateMutation } from "@/redux/features/authApiSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function useSocialAuth(provider: string, providerName: string) {
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
          router.push(ROUTES.echoHunt);
          toast.success(`Log in with ${providerName} sucessful`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(() => {
          router.push(ROUTES.auth.login);
          toast.error("Something went wrong");
        });
    }
    return () => {
      refRan.current = true;
    };
  }, [provider]);
}
