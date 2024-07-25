import React from "react";
import Link from 'next/link'


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="h-12 flex  w-full">
                <span>About</span>
                <span>About</span>
                <span>About</span>
                <Link href="/echoverse/portfolio">Portfolio</Link>
            </div>
            {children}
        </div>
    );
}
