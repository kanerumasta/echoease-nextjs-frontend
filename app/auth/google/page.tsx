"use client";

import { useSocialAuth } from "@/hooks/auth";
import { Suspense } from "react";

export default function Page() {
  useSocialAuth("google-oauth2", "Google");
  return;
  <Suspense fallback={<div>Loading</div>}>
    <div>Logging you in to echoease...</div>;
  </Suspense>;
}
