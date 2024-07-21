"use client";

import { useSocialAuth } from "@/hooks/auth";

export default function Page() {
    useSocialAuth("google-oauth2");
    return <div>Logging you in to echoease...</div>;
}
