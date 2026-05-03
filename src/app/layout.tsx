// app/layout.tsx
import "@/app/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import AuthProvider from "@/components/layout/AuthProvider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Principles",
  description: "Your wisdom guide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <html lang="en">
        <body>
          <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-center"  />
          </AuthProvider>
        </body>
      </html>
    
  );
}