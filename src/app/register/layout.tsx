"use client";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <>
            <header className="w-full flex justify-center">
                    
            </header>
            <main>{children}</main>
        </>
    );
}
