import "@/styles/globals.css";

import { Footer, Navbar } from "@/components/common";
import StoreProvider from "@/redux/provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Echoease",
  description: "Hire the best talent for your event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <StoreProvider>
          
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors position="top-right"/>
        </StoreProvider>
      </body>
    </html>
  );
}
