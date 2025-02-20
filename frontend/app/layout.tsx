import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Finance Manager",
  description: "Manage your personal finances with ease",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <h1 className="text-5xl mb-4 scroll-m-20  font-extrabold tracking-tight lg:text-6xl">
                Finance Manager
              </h1>
              <p className="text-xl mb-8 leading-7 [&:not(:first-child)]:mt-6">
                Manage your personal finances with ease. Track your expenses,
                set budgets, and achieve your financial goals.
              </p>
              <SignInButton>
                <div className="flex items-center justify-center">
                  <Button>Sign in 😉</Button>
                </div>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
            </SidebarProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

import "./globals.css";
