import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/lib/admin-context";
import AuthProvider from "@/lib/authProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Raigon High School",
    description:
        "Welcome to Raigon High School - Nurturing minds, building futures",
};

export default function RootLayout({
    children,
    session,
}: Readonly<{
    children: React.ReactNode;
    session: any;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider session={session}>
                    <AdminProvider>
                        <Navbar />
                        <main className="min-h-screen">{children}</main>
                        <Footer />
                        <Toaster />
                    </AdminProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
