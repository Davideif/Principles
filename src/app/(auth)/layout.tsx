import type { Metadata } from "next";
import "./auth.css";

export const metadata: Metadata = {
  title: "Auth",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-root">
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-bg-blob blob-1" />
        <div className="auth-bg-blob blob-2" />
        <div className="auth-bg-blob blob-3" />
      </div>
      <div className="auth-wrapper">{children}</div>
    </main>
  );
}