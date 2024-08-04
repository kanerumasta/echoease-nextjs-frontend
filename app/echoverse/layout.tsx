import { EchoverseTab } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
      <>
        <EchoverseTab />
        {children}
      </>
  );
}
