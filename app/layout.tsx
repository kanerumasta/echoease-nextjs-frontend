import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Footer, Navbar } from "@/components/common";
import StoreProvider from "@/redux/provider";
import { Setup } from "@/components/utils";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <StoreProvider>
                    <Setup />
                    <Navbar />
                    <div className="pt-12">
                    {children}
                    </div>
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    );
}
