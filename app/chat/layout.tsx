import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className="h-[600px] bg-slate-700 w-[400px]">
                <p>sildhfidf</p>
                <p>sildhfidf</p>
                <p>sildhfidf</p>
                <p>sildhfidf</p>
            </div>
            {children}
        </div>
    );
}
