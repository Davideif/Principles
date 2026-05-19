import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh flex items-center justify-center bg-background px-4 py-12 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-3xl" />
      <div className="relative z-10 w-full max-w-sm">
        {children}
      </div>
    </main>
  );
}