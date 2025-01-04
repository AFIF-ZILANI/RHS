import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/lib/admin-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raigon High School",
  description: "Welcome to Raigon High School - Nurturing minds, building futures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AdminProvider>
      </body>
    </html>
  );
}