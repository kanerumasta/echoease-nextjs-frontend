"use client";

import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
    params: {
        uid: string;
        token: string;
    };
}

export default function Page({ params }: Props) {
    const router = useRouter();
    const [activation] = useActivationMutation();
    const refRan = useRef(false);
    useEffect(() => {
        if (!refRan.current) {
            activation(params)
                .unwrap()
                .then(() => {
                    toast.success("Account activation successful!");
                })
                .catch(() => {
                    toast.error("Failed to activate your account");
                })
                .finally(() => router.replace("/auth/login"));
        }

        return () => {
            refRan.current = true;
        };
    }, [params]);
    return <div>Activating your account....</div>;
}
