import { Footer, Navbar } from "@/components/common";
import { Setup } from "@/components/utils";
import StoreProvider from "@/redux/provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

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
          <Setup />
            <Navbar />
            {children}
            <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
