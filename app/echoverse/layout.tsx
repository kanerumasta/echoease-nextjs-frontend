import { EchoverseTab } from "@/components/common";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
      <>
        <EchoverseTab />
        {children}
      </>
  );
}
